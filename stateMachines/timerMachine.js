import { createMachine, assign, sendParent } from 'xstate'

export const timer = (contextArg) => {
  const timerLogicState = {
    idle: {
      entry: ['resetCurrent', 'initEndTime', 'initPausedTime'],
      on: {
        START: {
          target: 'running',
        },
      },
    },
    running: {
      invoke: {
        id: 'intervalService',
        src: 'timerService',
      },
      on: {
        PAUSE: 'paused',
        STOP: 'idle',
        TICK: {
          actions: [
            'increment',
            'updateTimeLeft',
            'showTimeLeft',
            'updateParent',
          ],
          cond: (context) => {
            return context.current < context.timeEnd
          },
        },
      },
      always: [
        {
          target: 'completed',
          cond: (context) => {
            return context.current >= context.timeEnd
          },
        },
      ],
    },
    completed: {
      type: 'final',
    },
    paused: {
      entry: ['updatePausedTime'],
      on: {
        STOP: 'idle',
        CONTINUE: {
          target: 'running',
          actions: ['updateEndTime'],
        }
      },
    },
  }

  const actions = {
    initEndTime: assign({
      timeEnd: (context) => Date.now() + context.duration
    }),
    initPausedTime: assign({
      paused: (_) => 0
    }),
    updateEndTime: assign({
      timeEnd: (context) => Date.now() + (context.timeEnd - context.pausedTime)
    }),
    updatePausedTime: assign({
      pausedTime: (_) => Date.now()
    }),
    increment: assign({
      current: (_) => Date.now()
    }),
    updateTimeLeft: assign({
      timeLeft: (context) => {
        const timeDiff = context.timeEnd - Date.now();
        const fmtTime = new Date(timeDiff).toISOString().slice(14, 19);
        return fmtTime;
      },
    }),
    showTimeLeft: (context) => {
      return context.timeLeft
    },
    updateParent: sendParent((context, _) => ({
      type: 'UPDATE_TIME',
      data: context.timeLeft,
    })),
    resetCurrent: assign({
      current: 0,
    }),
  }

  const services = {
    timerService: (context) => (callback) => {
      let id = setInterval(() => {
        callback('TICK')
      }, 1000 )
      return () => clearInterval(id)
    },
  }

  const timerConfiguration = {
    id: 'timerInner',
    initial: 'idle',
    context: contextArg,
    states: timerLogicState,
  }

  return createMachine(timerConfiguration, {
    actions: actions,
    services: services,
  })
}
