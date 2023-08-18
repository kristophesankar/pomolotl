import { useContext } from 'react'
import {
  headerFlex,
  header,
  sitename,
  logo,
  iconDefault,
  settingsBtn,
} from '../styles/Index.module.sass'
import { IoIosHelpCircle } from 'react-icons/io'
import { PageContext } from '@/providers/helpProvider'
import Image from 'next/image'
export default function Header() {
  const { page, setPage } = useContext(PageContext)
  const newVal = page === 'timer' ? 'help' : 'timer'
  const changeHandler = () => {
    setPage(newVal)
  }

  return (
    <div className={headerFlex}>
      <div className={header}>
        <div className={logo}>
          <Image
            src="/assets/images/dorotimer-logo.svg"
            alt="pomolotl logo"
            width={60}
            height={60}
          />
        </div>
        <span className={sitename}>pomolotl</span>
      </div>
      <div>
        <button className={settingsBtn}>
          <IoIosHelpCircle onClick={changeHandler} className={iconDefault} />
        </button>
      </div>
    </div>
  )
}
