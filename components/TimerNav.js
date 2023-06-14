import { timerNav, btn, btnOutline } from '@/styles/Index.module.sass'
import Button from '@/components/Button'
import { useActor } from '@xstate/react'
import { useContext } from 'react'
import { GlobalStateContext } from '@/providers/globalState'

export default function TimerNav() {
  const { service } = useContext(GlobalStateContext)
  const [state, send] = useActor(service)

  const stateNames ={
    0: {target: 'focus', event: 'FOCUS', name: 'Focus'},
    1: {target: 'shortBreak', event: 'SHORT', name: 'Short Break'},
    2: {target: 'longBreak', event: 'LONG', name: 'Long Break'}
  };

  return (
    <div className={timerNav}>
      {Object.values(stateNames).map((e) => {
        const key = `key-${e.name}`
        return (
          <Button
            title={e.name}
            key={key}
            onClick={() => send(e.event)}
            classNames={state.matches(e.target) ? btn : btnOutline}
          />
        )
      })}
    </div>
  )
}
