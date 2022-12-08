import {timerNav, btn} from '@/styles/Index.module.sass'
import Button from '@/components/Button'
export default function TimerNav () {
  return (
    <div className={timerNav}>
        <Button title='Pomodoro' />
        <Button title='Short Break' />
        <Button title='Long Break' />
    </div>
  )
}
