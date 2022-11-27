import { container } from '../styles/Index.module.css'
import Header from './header'
import Card from './card'
import Footer from './footer'
export default function Home() {
  return (
    <div className={container}>
      <Header />
      <Card />
      <Footer />
    </div>
  )
}
