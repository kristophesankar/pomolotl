import { item, header, sitename } from '../styles/Index.module.sass'
export default function Header() {
  return (
    <div className={item}>
      <div className={header}>
        <img src="/assets/images/dorotimer-logo.svg" style={{ width: '50%', height: 'auto' }}/>
        <h1 class={sitename}>&bull; axotimer &bull;</h1>
      </div>
    </div>
  )
}
