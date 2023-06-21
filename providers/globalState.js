import { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import { pomodoroMachine } from '@/stateMachines/pomodoroMachine';

export const GlobalStateContext = createContext({});

export const GlobalStateProvider = (props) => {
  const service = useInterpret(pomodoroMachine);
  return (
    <GlobalStateContext.Provider value={{ service }}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};
