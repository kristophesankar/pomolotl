import { timer as timerClass, btn } from '@/styles/Index.module.sass'
import { useMachine } from '@xstate/react';
import {timerMachine} from '@/stateMachines/timer'
import { useEffect, useState } from 'react'
import Button from '@/components/Button'

export default function Timer() {
  const [current, send ] = useMachine(timerMachine);

  let [timeLeft, setTimeLeft] = useState(25)
  let [paused, setPaused] = useState(true)

  let handlePause = (e) => {
    e.preventDefault()
    if (paused) {
      setPaused(false)
    } else {
      setPaused(true)
    }
  }

  let handleStart = (e) => {
    e.preventDefault()
    setTimeLeft(25)
    setPaused(false)
  }

  useEffect(() => {
    if (!paused) {
      let id = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1)
        }
      }, 1000)
      return () => clearInterval(id)
    }
  })
  return (
    <div className={timerClass}>
      <h1 className={timerClass}>{timeLeft}:00</h1>
      <Button
        title={timeLeft === 25 ? 'Start' : 'Restart'}
        onClick={handleStart}
      />
      { (timeLeft < 25) ? <Button title="Pause/Resume" onClick={handlePause} /> : null}
    </div>
  )
}
