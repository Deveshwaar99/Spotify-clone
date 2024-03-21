import { getURL } from '@/lib/helpers'
import { stripe } from '@/lib/stripe/stripe'
import { createOrRetrieveCustomer } from '@/lib/stripe/stripe_Supabase_Subscription_utils'
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) throw Error('Could not get user')
    const customer = await createOrRetrieveCustomer({
      uuid: user.id || '',
      email: user.email || '',
    })

    if (!customer) throw Error('Could not get customer')
    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${getURL()}/account`,
    })

    return NextResponse.json({ url })
  } catch (err: any) {
    console.error(err)
    new NextResponse('Internal Error', { status: 500 })
  }
}
