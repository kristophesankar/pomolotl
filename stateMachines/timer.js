import { createMachine, send, assign, spawn, sendParent } from 'xstate'

const padTo2Digits = (num) => {
  return num.toString().padStart(2, '0')
}

let initFocusTime = '25:00'
let initShortTime = '05:00'
let initLongTime = '15:00'

const initContext = {
  duration: 1500,
  current: 0,
  timeLeft: '',
  interval: 1,
}

const shortBreakContext = {
  duration: 300,
  current: 0,
  timeLeft: '',
  interval: 1,
}

const longBreakContext = {
  duration: 900,
  current: 0,
  timeLeft: '',
  interval: 1,
}

const timer = (contextArg) => {
  const timerLogicState = {
    idle: {
      entry: ['resetCurrent'],
      on: {
        START: 'running',
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
            return context.current < context.duration
          },
        },
      },
      always: [
        {
          target: 'completed',
          cond: (context) => {
            return context.current >= context.duration
          },
        },
      ],
    },
    completed: {
      type: 'final',
    },
    paused: {
      on: {
        STOP: 'idle',
        CONTINUE: 'running',
      },
    },
  }

  const actions = {
    increment: assign({
      current: (context) => context.current + context.interval,
    }),
    updateTimeLeft: assign({
      timeLeft: (context) => {
        const diff = context.duration - context.current
        const minutes = Math.floor(diff / 60)
        const seconds = diff % 60
        const formattedTime = `${padTo2Digits(minutes)}:${padTo2Digits(
          seconds
        )}`
        return formattedTime
      },
    }),
    showTimeLeft: (context) => {
      console.log(context.timeLeft)
      return context.timeLeft
    },
    updateParent: sendParent((context, event) => ({
      type: 'UPDATE_TIME',
      data: context.timeLeft,
    })),
    resetCurrent: assign({
      current: 0,
    }),
  }

  const services = {
    timerService: (context) => (callback) => {
      const intervalWorker = new Worker(new URL('./intervalWorker.js', import.meta.url))
      intervalWorker.postMessage('start')
      intervalWorker.onmessage = (event) => {
        callback('TICK');
        console.log(`Received message from worker: ${event.data}`);
      };
      return () => intervalWorker.postMessage('stop');
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

// app states

const focus = {
  invoke: {
    id: 'timerInner',
    src: (context) => context.timerInner,
    onDone: [
      {
        target: 'shortBreak',
        actions: ['updateTimesRun'],
        cond: (context) => context.timesRun < 3,
      },
      {
        target: 'longBreak',
        actions: ['resetTimesRun'],
      },
    ],
  },
  exit: ['destroyTimer'],
  entry: [
    assign({
      currentTime: (context) => initFocusTime,
    }),
  ],
  on: {
    START: {
      actions: ['spawnFocusTimer', 'sendStart'],
    },
    STOP: {
      actions: [
        'sendStop',
        assign({
          currentTime: (context) => initFocusTime,
        }),
      ],
    },
    UPDATE_TIME: {
      actions: ['updateTime'],
    },
    PAUSE: {
      actions: ['sendPause'],
    },
    CONTINUE: {
      actions: ['sendContinue'],
    },
  },
}

const shortBreak = {
  invoke: {
    id: 'timerInner',
    src: (context) => context.timerInner,
    onDone: {
      target: 'focus',
    },
  },
  exit: ['destroyTimer'],
  entry: [
    assign({
      currentTime: (_) => initShortTime,
    }),
  ],
  on: {
    START: {
      actions: ['spawnShortTimer', 'sendStart'],
    },
    STOP: {
      actions: [
        'sendStop',
        assign({
          currentTime: (_) => initShortTime,
        }),
      ],
    },
    UPDATE_TIME: {
      actions: ['updateTime'],
    },
    PAUSE: {
      actions: ['sendPause'],
    },
    CONTINUE: {
      actions: ['sendContinue'],
    },
  },
}

const longBreak = {
  invoke: {
    id: 'timerInner',
    src: (context) => context.timerInner,
    onDone: {
      target: 'focus',
    },
  },
  exit: ['destroyTimer'],
  entry: [
    assign({
      currentTime: (_) => initLongTime,
    }),
  ],
  on: {
    START: {
      actions: ['spawnLongTimer', 'sendStart'],
    },
    STOP: {
      actions: [
        'sendStop',
        assign({
          currentTime: (_) => initLongTime,
        }),
      ],
    },
    UPDATE_TIME: {
      actions: ['updateTime'],
    },
    PAUSE: {
      actions: ['sendPause'],
    },
    CONTINUE: {
      actions: ['sendContinue'],
    },
  },
}

const appStates = {
  focus: focus,
  shortBreak: shortBreak,
  longBreak: longBreak,
}

export const appConfiguration = {
  id: 'app',
  initial: 'focus',
  context: {
    timesRun: 0,
    timerInner: null,
    currentTime: initFocusTime,
  },
  states: appStates,
  predictableActionArguments: true,
}

export const appActions = {
  destroyTimer: assign({
    timerInner: null,
  }),
  updateTime: assign({
    currentTime: (_, event) => event.data,
  }),
  cleanupTimer: (context) => {
    context.timerInner.stop()
  },
  updateTimesRun: assign({
    timesRun: (context) => context.timesRun + 1,
  }),
  resetTimesRun: assign({
    timesRun: 0,
  }),
  spawnFocusTimer: assign({
    timerInner: (context, event) => {
      return spawn(timer(initContext), { name: 'timerInner', sync: true })
    },
  }),
  spawnShortTimer: assign({
    timerInner: () => {
      return spawn(timer(shortBreakContext), { name: 'timerInner', sync: true })
    },
  }),
  spawnLongTimer: assign({
    timerInner: () => {
      return spawn(timer(longBreakContext), { name: 'timerInner', sync: true })
    },
  }),
  sendStart: send(
    { type: 'START' },
    {
      to: (context) => context.timerInner,
    }
  ),
  sendStop: send(
    { type: 'STOP' },
    {
      to: (context) => context.timerInner,
    }
  ),
  sendPause: send(
    { type: 'PAUSE' },
    {
      to: (context) => context.timerInner,
    }
  ),
  sendContinue: send(
    { type: 'CONTINUE' },
    {
      to: (context) => context.timerInner,
    }
  ),
}

export const pomodoroMachine = createMachine(appConfiguration, {
  actions: appActions,
})
