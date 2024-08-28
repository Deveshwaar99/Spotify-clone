import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2024-06-20',
  typescript: true,
  appInfo: {
    name: 'spotify-clone',
  },
})

export { stripe }
