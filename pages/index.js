import { container } from '@/styles/Index.module.sass'
import Header from '@/components/Header'
import Content from '@/components/Content'
import Footer from '@/components/Footer'
import { GlobalStateProvider } from '@/providers/globalState'

export default function Home() {
  return (
    <GlobalStateProvider>
      <div className={container}>
        <Header />
        <Content />
        <Footer />
      </div>
    </GlobalStateProvider>
  )
}
