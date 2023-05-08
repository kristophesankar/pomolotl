import { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import { pomodoroMachine } from '@/stateMachines/timer';

export const GlobalStateContext = createContext({});

export const GlobalStateProvider = (props) => {
  const pomodoroService = useInterpret(pomodoroMachine);

  return (
    <GlobalStateContext.Provider value={{ pomodoroService }}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};
