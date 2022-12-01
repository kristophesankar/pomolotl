import {card} from '@/styles/Index.module.sass'
import Timer from '@/components/Timer'
import TimerNav from '@/components/TimerNav'
export default function Card () {
  return (
    <div className={card}>
      <TimerNav />
      <Timer />
    </div>
  )
}
