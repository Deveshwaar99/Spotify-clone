import { getURL } from '@/lib/helpers'
import { stripe } from '@/lib/stripe/stripe'
import { createOrRetrieveCustomer } from '@/lib/stripe/stripe_Supabase_Subscription_utils'

import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import type Stripe from 'stripe'

import { z } from 'zod'

const RequestBodySchema = z.object({
  priceId: z.string(),
  quantity: z.number().int().positive().default(1),
  metadata: z.record(z.unknown()).default({}),
})

export async function POST(req: Request) {
  const body = await req.json()

  const { priceId, quantity, metadata } = RequestBodySchema.parse(body)

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

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer,
      line_items: [
        {
          price: priceId,
          quantity,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: (metadata?.trial_period_days as number) ?? 30,
      },
      success_url: `${getURL()}/account`,
      cancel_url: `${getURL()}/`,
    }
    const session = await stripe.checkout.sessions.create(sessionParams)

    return NextResponse.json({ sessionId: session.id, url: session.url })
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    console.error(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
