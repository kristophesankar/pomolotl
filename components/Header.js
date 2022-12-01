import {item, header} from '../styles/Index.module.sass'
export default function Header () {
  return (
    <div className={item}>
      <div className={header}>
        <h1>DoroTimer</h1>
        <p>A pomodoro timer!</p>
      </div>
    </div>
  );
}
