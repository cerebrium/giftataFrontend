import '../styles/globals.scss'
import { Provider } from 'react-redux'
import { useStore } from '../store'
import { AppProps } from 'next/app'

// main application
export default function App({ Component, pageProps }: AppProps) {
    // create the reference for redux throughout the application
    const store = useStore(pageProps.initialReduxState)

  return (
    // add the store to all pages
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
  )
}