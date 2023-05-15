import { btn } from '@/styles/Index.module.sass'
export default function Button({title, onClick}) {
  return <button className={btn} onClick={onClick}>{title}</button>
}
