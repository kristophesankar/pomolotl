import { container } from '@/styles/Index.module.css'
import Header from '@/components/Header'
import Content from '@/components/Content'
import Footer from '@/components/Footer'
export default function Home() {
  return (
    <div className={container}>
      <Header />
      <Content/>
      <Footer />
    </div>
  )
}
