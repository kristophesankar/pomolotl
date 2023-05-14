import { useContext } from 'react'
import { timer as timerClass, btn } from '@/styles/Index.module.sass'
import Button from '@/components/Button'
import { createMachine } from 'xstate'
import { useActor, useInterpret } from '@xstate/react'
import { pomodoroMachine } from '@/stateMachines/timer'

export default function Timer() {
  const service = useInterpret(pomodoroMachine)
  const [state] = useActor(service)
  console.log(state.context.timerInner)
  return (
    <div>
      <h1>{state.context.currentTime}</h1>

      {state.context.timerInner === null ? (
        <Button title="Start" onClick={() => service.send('START')} />
      ) : (
        ''
      )}
    </div>
  )
}
