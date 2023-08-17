import {
  headerFlex,
  header,
  sitename,
  logo,
  iconDefault,
  settingsBtn,
} from '../styles/Index.module.sass'
import { IoIosSettings } from 'react-icons/io'
import Image from 'next/image'
export default function Header() {
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
          <IoIosSettings className={iconDefault} />
        </button>
      </div>
    </div>
  )
}
