import { PageContext } from '@/providers/helpProvider'
import { useContext } from 'react'
import { item } from '../styles/Index.module.sass'
import Card from '@/components/Card'
import Help from '@/components/Help'
export default function Content() {
  const { page } = useContext(PageContext)
  return (
    <div className={item}>
      {page == 'timer' ? (
        <div className="fade">
          <Card />
        </div>
      ) : (
        <Help />
      )}
    </div>
  )
}
