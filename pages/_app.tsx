import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components/exports'
import { Toaster } from 'react-hot-toast'

import '@stripe/stripe-js';
import { Provider } from 'react-redux'
import { store } from 'redux/store'

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <Layout>
      <Toaster />
      <Component {...pageProps} />
    </Layout>
  </Provider>
}
