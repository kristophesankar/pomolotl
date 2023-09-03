import { item } from '../styles/Index.module.sass'
import Card from '@/components/Card'
export default function Content() {
  return (
    <div className={item}>
      <div className="fade">
        <Card />
      </div>
    </div>
  )
}
