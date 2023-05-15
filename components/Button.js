import { btn } from '@/styles/Index.module.sass'
export default function Button({title, onClick, classNames = btn}) {
  return <button className={classNames} onClick={onClick}>{title}</button>
}
