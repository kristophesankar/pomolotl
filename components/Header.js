import {
  headerFlex,
  header,
  sitename,
  logo,
  settingsBtn,
} from '../styles/Index.module.sass'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HelpIcon from './HelpIcon'
export default function Header() {
  const { pathname } = useRouter()
  const [helpPath, setHelpPath] = useState('/')

  useEffect(() => {
    setHelpPath(pathname === '/' ? '/help' : '/')
  }, [helpPath, pathname])

  const handleClick = () => {
    setHelpPath(pathname === '/' ? '/help' : '/')
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
        <button onClick={handleClick} className={settingsBtn}>
          <Link href={helpPath}>
            <HelpIcon name={helpPath} />
          </Link>
        </button>
      </div>
    </div>
  )
}
