import { item, header, sitename } from '../styles/Index.module.sass'
import Image from 'next/image'
export default function Header() {
  return (
    <div className={item}>
      <div className={header}>
        <Image src="/assets/images/dorotimer-logo.svg" width={0} height={0} style={{ width: '50%', height: 'auto' }}/>
        <h1 class={sitename}>pomolotl</h1>
      </div>
    </div>
  )
}
