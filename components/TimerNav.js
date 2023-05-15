import { timerNav, btn, btnOutline } from '@/styles/Index.module.sass'
import Button from '@/components/Button'
import { useActor } from '@xstate/react'
import { useContext } from 'react'
import { GlobalStateContext } from '@/providers/globalState'

export default function TimerNav() {
  const { service } = useContext(GlobalStateContext)
  const [state] = useActor(service)

  const stateNames = {
    focus: 'Focus',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  }

  return (
    <div className={timerNav}>
      {Object.keys(stateNames).map((e) => {
        const key = `key-${e}`
        return (
          <Button
            title={stateNames[e]}
            key={key}
            classNames={state.matches(e) ? btn : btnOutline}
          />
        )
      })}
    </div>
  )
}
