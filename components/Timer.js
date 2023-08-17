import Button from '@/components/Button'
import { useActor } from '@xstate/react'
import { useContext } from 'react'
import { GlobalStateContext } from '@/providers/globalState'
import TimerNav from '@/components/TimerNav'
import { timerText } from '../styles/Index.module.sass'

export default function Timer() {
  const { service } = useContext(GlobalStateContext)
  const [state, send] = useActor(service)
  const { currentTime } = state.context
  const { timerInner } = state.children
  const interValState =
    timerInner.getSnapshot() !== undefined
      ? timerInner.getSnapshot().value
      : undefined
  return (
    <div>
      <TimerNav />
      <div className={timerText}>{currentTime}</div>
      {
        {
          undefined: <Button title="Start" onClick={() => send('START')} />,
          idle: <Button title="Start" onClick={() => send('START')} />,
          running: (
            <>
              <Button title="Pause" onClick={() => send('PAUSE')} />{' '}
              <Button title="Stop" onClick={() => send('STOP')} />{' '}
            </>
          ),
          paused: (
            <>
              <Button title="Continue" onClick={() => send('CONTINUE')} />{' '}
              <Button title="Restart" onClick={() => send('START')} />
              <Button title="Stop" onClick={() => send('STOP')} />{' '}
            </>
          ),
        }[interValState]
      }
    </div>
  )
}
