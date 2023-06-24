import { card } from '@/styles/Index.module.sass'
import Timer from '@/components/Timer'
export default function Card() {
  return (
    <div className={card}>
      <Timer />
    </div>
  )
}
