import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components/exports'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from 'redux/store'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </Elements>)
}
