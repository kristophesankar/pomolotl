import { btn } from '@/styles/Index.module.sass'
export default function Button({title, onClick = undefined, classNames = btn}) {
  return <button className={classNames} onClick={onClick} data-cy="button">{title}</button>
}
