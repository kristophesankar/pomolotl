import { createContext } from 'react'
export const PageContext = createContext({
  page: 'timer',
  setPage: () => {},
})
