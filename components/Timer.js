import { timerNav, btnOutline, btn } from '@/styles/Index.module.sass'
import Button from '@/components/Button'
import { useActor } from '@xstate/react'
import { useContext } from 'react'
import { GlobalStateContext } from '@/providers/globalState'

export default function Timer() {
  const { service } = useContext(GlobalStateContext)
  const [state] = useActor(service)

  const stateNames = {
    focus: 'Focus',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  }

  return (
    <div>
      <div className={timerNav}>
        {Object.values(stateNames).map((e) => {
          const name = e.replace(/s/g, '')
          const key = `key-${name}`
          return (
            <span
              key={key}
              className={stateNames[state.value] === e ? btn : btnOutline}
            >
              {e}
            </span>
          )
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
