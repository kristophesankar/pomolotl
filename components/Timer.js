import { useContext } from 'react';
import { timer as timerClass, btn } from '@/styles/Index.module.sass'
import Button from '@/components/Button'
import { createMachine } from 'xstate';
import { useActor, useInterpret } from '@xstate/react';
import {  pomodoroMachine } from '@/stateMachines/timer';


export default function Timer() {
  const service = useInterpret(pomodoroMachine)
  const [ state ] = useActor(service)
  return (<div>
    <h1>{(state.context.timerInner !== null) ? state.context.timerInner.state.context.showTimeLeft: ''}</h1>
    <Button title="Start" onClick={() => service.send('START')}/>
  </div>)
}
