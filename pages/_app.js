import { useState, useMemo } from 'react'
import { container } from '@/styles/Index.module.sass'
import { GlobalStateProvider } from '@/providers/globalState'
import { PageContext } from '@/providers/helpProvider'
import '@/styles/globals.sass'

function MyApp({ Component, pageProps }) {
  const [page, setPage] = useState('timer')
  const value = useMemo(() => ({ page, setPage }), [page])

  return (
    <GlobalStateProvider>
      <PageContext.Provider value={value}>
        <div className={container}>
          {useMemo(
            () => (
              <>
                <Component {...pageProps} />
              </>
            ),
            []
          )}
        </div>
      </PageContext.Provider>
    </GlobalStateProvider>
  )
}

export default MyApp
