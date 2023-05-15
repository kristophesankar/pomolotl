import { useContext } from 'react'
import { timer as timerClass, timerNav, btnOutline, btn } from '@/styles/Index.module.sass'
import Button from '@/components/Button'
import { createMachine } from 'xstate'
import { useActor, useInterpret } from '@xstate/react'
import { pomodoroMachine } from '@/stateMachines/timer'

export default function Timer() {
  const stateNames = {
    focus: 'Focus',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  }
  const service = useInterpret(pomodoroMachine)
  const [state] = useActor(service)

  return (
    <div>
      <div className={timerNav}>
        {Object.values(stateNames).map((e) => {
          const name = e.replace(/s/g, '')
          const key = `key-${name}`
          return <span key={key} className={(stateNames[state.value] === e) ? btn : btnOutline}>{e}</span>
        })}
      </div>
      <h1>{state.context.currentTime}</h1>
      {state.context.timerInner === null ? (
        <Button title="Start" onClick={() => service.send('START')} />
      ) : (
        ''
      )}
    </div>
  )
}
