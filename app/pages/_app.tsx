import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '../styles/globals.css';
import '../styles/animations.css';

import { Web3Provider } from '../src/contexts/Web3Context';
import { ENSProvider } from '../src/contexts/ENSContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Web3Provider>
        <ENSProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </ENSProvider>
      </Web3Provider>
    </ChakraProvider>
  )
}

export default MyApp;

