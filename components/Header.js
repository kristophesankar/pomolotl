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
  const router = useRouter()
  const [helpPath, setHelpPath] = useState('/')

  const updatePath = () => {
    return router.pathname === '/' ? '/help' : '/'
  }

  useEffect(() => {
    setHelpPath(updatePath)
  }, [helpPath])

  const handleClick = () => {
    setHelpPath(updatePath)
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
