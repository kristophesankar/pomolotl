import { iconDefault } from '../styles/Index.module.sass'
import { IoIosHelpCircle, IoIosCloseCircle } from 'react-icons/io'

export default function HelpIcon({ name }) {
  return (
        {
          '/' : (
            <IoIosCloseCircle className={iconDefault} />
          ),
          '/help' : (
            <IoIosHelpCircle className={iconDefault} />
          )
        }[name]
  )
}
