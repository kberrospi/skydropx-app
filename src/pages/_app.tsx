import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../redux/store';

import '../styles/globals.css';



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </Provider>
  )
}

export default MyApp
