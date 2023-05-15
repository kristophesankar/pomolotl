import { createMachine, send, assign, spawn, sendParent } from 'xstate'

const padTo2Digits = (num) => {
  return num.toString().padStart(2, '0')
}

const initContext = {
  duration: 25,
  current: 0,
  timeLeft: '',
  interval: 1,
}

const shortBreakContext = {
  duration: 5,
  current: 0,
  timeLeft: '',
  interval: 1,
}

const longBreakContext = {
  duration: 15,
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
          actions: ['increment', 'updateTimeLeft', 'showTimeLeft', 'updateParent',],
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
      type: "UPDATE_TIME",
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
      }, 1000 * context.interval)
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
  entry: [assign({
    currentTime: (context) => "25:00"
  })],
  on: {
    START: {
      actions: ['spawnFocusTimer', 'sendStart'],
    },
    UPDATE_TIME: {
      actions: ["updateTime"],
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
  entry: [assign({
    currentTime: (context) => "05:00"
  })],
  on: {
    START: {
      actions: ['spawnShortTimer', 'sendStart'],
    },
    UPDATE_TIME: {
      actions: ["updateTime"],
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
  entry: [assign({
    currentTime: (context) => "15:00"
  })],
  on: {
    START: {
      actions: ['spawnLongTimer', 'sendStart'],
    },
    UPDATE_TIME: {
      actions: ["updateTime"],
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
    currentTime: "25:00",
  },
  states: appStates,
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
      return spawn(timer(initContext), 'timerInner')
    },
  }),
  spawnShortTimer: assign({
    timerInner: () => {
      return spawn(timer(shortBreakContext), 'timerInner')
    },
  }),
  spawnLongTimer: assign({
    timerInner: () => {
      return spawn(timer(longBreakContext), 'timerInner')
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
}

export const pomodoroMachine = createMachine(appConfiguration, {
  actions: appActions,
})
