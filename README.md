
<p align="center">
</p>

<br>
<div align="center">
  <a href="https://pomolotl.netlify.app" target="_blank">
  <img src="https://github.com/kristophesankar/dorotimer/assets/33190221/9298246a-bfdc-44f2-b122-75abf94c1652" height="100" width="auto" alt="Sublime's custom image"/>
  </a>
  <h1><i>pomolotl</i></h1>
</div>

<p align="center">
  <b>
    Pomodoro - Axolotl. A pomodoro timer app built with NextJS and XSTATE.
  </b>
</p>
<p align="center">
[![Netlify Status](https://api.netlify.com/api/v1/badges/48f52270-bed0-4624-a595-9315f9d6fd3a/deploy-status)](https://app.netlify.com/sites/doro-timer/deploys)
</p>
##
Table Of Contents
- [Background](#background)
- [State Charts](#state-charts)
- [Todo](#todo)
- [Getting Started](#getting-started)

## Background / Motivation
Pomodoro is a time management technique developed by Francesco Cirillo in the late 1980s. The technique involves breaking work into focused intervals of 25 minutes, called "Pomodoros," separated by short breaks of 5-10 minutes. After four Pomodoros, a longer break of 15-30 minutes is taken.

The idea behind the Pomodoro technique is that by breaking work into smaller, more manageable intervals, it becomes easier to focus and avoid distractions. It also helps to prevent burnout by providing regular breaks to rest and recharge.

The name "Pomodoro" comes from the Italian word for tomato, which is what Cirillo used as a timer when he first developed the technique. Today, there are many digital Pomodoro timers available, making it easy to implement the technique in your work routine.

## State Charts

State charts are visual representations of state machines, which describe the behavior of a system in response to events. They use a combination of states, transitions, and actions to model complex behaviors and interactions. 

State charts are a good design pattern for modeling the Pomodoro method because it involves a series of states and transitions between those states. For example, the Pomodoro method involves transitioning between work and break states, as well as longer break states after completing multiple work sessions. State charts can effectively model these states and transitions, making it easier to understand and implement the Pomodoro method as a software application.

- An interactive state chart for the state machine can be found here: [State Chart](https://stately.ai/viz/b5311ee3-ad7d-45d5-b3df-247d2e31bf23)
### State Chart 1
This chart maps the following states: focus, shortBreak and longBreak
![state_chart_1](https://user-images.githubusercontent.com/33190221/235471827-028b006c-bc4a-4020-b4d6-b0a803e9b405.png)
### State Chart 2
This chart maps the following states: idle, paused, running and completed
![state_chart_2](https://user-images.githubusercontent.com/33190221/235472190-231cc4f8-8bb9-4094-8d67-c71edfe94e24.png)

## Todo
The task list can be found [here](https://trello.com/b/WuOPUz20/pomolotl).

## Getting Started

### Installation
```bash
yarn install
```

### Running the app
```bash
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Running ESLint
```bash
yarn next lint 
```
### Running Cypress Tests
Running the following command brings up the Cypress Launchpad.
```bash
yarn runt cypress open 
```

