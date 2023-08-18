import { item, help } from '../styles/Index.module.sass'

export default function Help() {
  return (
    <div className={item}>
      <div className={help}>
        <h3>How to use this app.</h3>
        <p>
          Press the "quot;Focus"quot; button followed by start to enter a focus sprint. At
          the end of the timer a sound will indicate this sprint is over and
          will automatically move to the next logical state. In this
          implimentation a "quot;Short Break"quot; follows the completition of the "quot;Focus"quot;
          state three times before finally entering a "quot;Long Break"quot; state. The
          pattern is then repeated.
        </p>
        <h3>What does pomolotl mean?</h3>
        <p>Pomolotl is just a combination of two words. Pomodoro & Axolotl.</p>

        <h3>The Pomodoro method?</h3>
        <p>
          Pomodoro is a time management technique developed by Francesco Cirillo
          in the late 1980s. The technique involves breaking work into focused
          intervals of 25 minutes, called "quot;Pomodoros,"quot; separated by short breaks
          of 5-10 minutes. After four Pomodoros, a longer break of 15-30 minutes
        </p>
        <p>
          The idea behind the Pomodoro technique is that by breaking work into
          smaller, more manageable intervals, it becomes easier to focus and
          avoid distractions. It also helps to prevent burnout by providing
          regular breaks to rest and recharge.
        </p>
        <p>
          The name "quot;Pomodoro"quot; comes from the Italian word for tomato, which is
          what Cirillo used as a timer when he first developed the technique.
          Today, there are many digital Pomodoro timers available, making it
          easy to implement the technique in your work routine.
        </p>
      </div>
    </div>
  )
}
