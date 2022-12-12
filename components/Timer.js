import { timer, btn } from '@/styles/Index.module.sass'
import { useMachine } from '@xstate/react'
import { createMachine } from 'xstate'

const timerMachine = createMachine({
  id: 'timer',
  initial: 'focus',
  states: {
    focus: {},
    shortBreak: {},
    longBreak: {},
    done: {},
  }
})

export default function Timer() {
  return (
    <div className={timer}>
      <h1 className={timer}>25:00</h1>
    </div>
  )
}
