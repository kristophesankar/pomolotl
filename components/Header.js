import {item, header} from '../styles/Index.module.sass'
export default function Header () {
  return (
    <div className={item}>
      <div className={header}>
        <h1>dorotimer</h1>
        <p>This project is in active development!</p>
      </div>
    </div>
  );
}
