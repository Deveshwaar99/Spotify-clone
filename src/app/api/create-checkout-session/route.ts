import { getURL } from '@/lib/helpers'
import { stripe } from '@/lib/stripe/stripe'
import { createOrRetrieveCustomer } from '@/lib/stripe/stripe_Supabase_Subscription_utils'

import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { price, quantity = 1, metadata = {} } = await req.json()

  try {
    const supabaseClient = createClient()

    const { data, error } = await supabaseClient.auth.getUser()
    if (error) {
      throw new Error('User not found')
    }

    const customer = await createOrRetrieveCustomer({
      uuid: data.user.id || '',
      email: data.user.email || '',
    })

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer,
      line_items: [
        {
          price: price.id,
          quantity,
        },
      ],
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: metadata.trial_period_days ?? 30,
        metadata,
      },
      success_url: `${getURL()}/account`,
      cancel_url: `${getURL()}/`,
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
