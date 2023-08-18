import { useState, useMemo } from 'react'
import { container } from '@/styles/Index.module.sass'
import Header from '@/components/Header'
import Content from '@/components/Content'
import Footer from '@/components/Footer'
import { GlobalStateProvider } from '@/providers/globalState'
import { PageContext } from '@/providers/helpProvider'

export default function Home() {
  const [page, setPage] = useState('timer')
  const value = useMemo(() => ({ page, setPage }), [page])
  return (
    <GlobalStateProvider>
      <PageContext.Provider value={value}>
        <div className={container}>
          {useMemo(
            () => (
              <>
                <Header />
                <Content />
                <Footer />
              </>
            ),
            []
          )}
        </div>
      </PageContext.Provider>
    </GlobalStateProvider>
  )
}
