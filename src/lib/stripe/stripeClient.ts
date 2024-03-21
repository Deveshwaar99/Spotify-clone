import Stripe from 'stripe'

const stripeClient = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export { stripeClient }
