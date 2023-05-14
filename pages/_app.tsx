import { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <AnimatePresence initial={false} mode="wait">
        <Component {...pageProps} />
      </AnimatePresence>
  )
}
