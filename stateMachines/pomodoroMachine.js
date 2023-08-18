import { createMachine, send, assign, spawn } from 'xstate'
import { timer } from '@/stateMachines/timerMachine'
import alarmAudioFile from '../assets/sounds/alarm.mp3'
const sound =
  typeof Audio !== 'undefined' ? new Audio(alarmAudioFile) : undefined

const msToMins = (time) => {
  return new Date(time).toISOString().slice(14, 19)
}

const focusMs = 1500000
const shortMs = 300000
const longMs = 900000

const initFocusTime = msToMins(focusMs)
const initShortTime = msToMins(shortMs)
const initLongTime = msToMins(longMs)

const initContext = {
  duration: focusMs + 1000,
  current: 0,
  timeLeft: '',
  timeEnd: 0,
  pausedTime: 0,
}

const shortBreakContext = {
  duration: shortMs + 1000,
  current: 0,
  timeLeft: '',
  timeEnd: 0,
  pausedTime: 0,
}

const longBreakContext = {
  duration: longMs + 1000,
  current: 0,
  timeLeft: '',
  timeEnd: 0,
  pausedTime: 0,
}

const reusableEvents = {
  UPDATE_TIME: {
    actions: ['updateTime'],
  },
  PAUSE: {
    actions: ['sendPause'],
  },
  CONTINUE: {
    actions: ['sendContinue'],
  },
  FOCUS: 'focus',
  SHORT: 'shortBreak',
  LONG: 'longBreak',
}

let onDoneActions = ['playTimerDoneSound']

// app states

const focus = {
  invoke: {
    id: 'timerInner',
    src: (context) => context.timerInner,
    onDone: [
      {
        target: 'shortBreak',
        actions: [...onDoneActions, 'updateTimesRun'],
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
      currentTime: (_) => initFocusTime,
    }),
  ],
  on: {
    START: {
      actions: ['spawnFocusTimer', 'sendStart', 'initTimerSound' ],
    },
    STOP: {
      actions: [
        'sendStop',
        assign({
          currentTime: (_) => initFocusTime,
        }),
      ],
    },
    ...reusableEvents,
  },
}

const shortBreak = {
  invoke: {
    id: 'timerInner',
    src: (context) => context.timerInner,
    onDone: {
      target: 'focus',
      actions: onDoneActions,
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
    ...reusableEvents,
  },
}

const longBreak = {
  invoke: {
    id: 'timerInner',
    src: (context) => context.timerInner,
    onDone: {
      target: 'focus',
      actions: onDoneActions,
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
    ...reusableEvents,
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
  initTimerSound: () => {
    sound.muted = true
    sound.play()
  },
  playTimerDoneSound: () => {
    sound.muted = false
    sound.play()
  },
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
