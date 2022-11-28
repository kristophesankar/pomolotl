import { container } from '../styles/Index.module.css'
import Header from './header'
import Content from './content'
import Footer from './footer'
export default function Home() {
  return (
    <div className={container}>
      <Header />
      <Content/>
      <Footer />
    </div>
  )
}
