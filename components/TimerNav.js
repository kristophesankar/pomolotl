import {timerNav, btn} from '@/styles/Index.module.sass'
export default function TimerNav () {
  return (
    <div className={timerNav}>
        <button className={btn}>Pomodoro</button>
        <button className={btn}>Short Break</button>
        <button className={btn}>Long Break</button>
    </div>
  )
}
