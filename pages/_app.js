import { container } from '@/styles/Index.module.sass'
import { GlobalStateProvider } from '@/providers/globalState'
import '@/styles/globals.sass'

function MyApp({ Component, pageProps }) {
  return (
    <GlobalStateProvider>
      <div className={container}>
        <Component {...pageProps} />
      </div>
    </GlobalStateProvider>
  )
}

export default MyApp
