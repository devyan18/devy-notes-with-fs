import {
  useState,
  useEffect,
  createContext,
  useContext
} from 'react'
import { Session, SessionContext } from '../interfaces'

const Context = createContext<SessionContext>({
  session: {
    token: null
  },
  setSession: () => {}
})

interface Props {
  children: JSX.Element | Array<JSX.Element>
}

const SessionProvider = (props: Props) => {
  const initialSession = {
    token: null
  }

  const [session, setSession] = useState<Session>(initialSession)

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      setSession({
        token
      })
    }
  }, [])

  return (
    <Context.Provider value={{ session, setSession }}>
      {props.children}
    </Context.Provider>
  )
}

const useSession = () => useContext(Context).session
const useSetSession = () => useContext(Context).setSession

export { useSession, useSetSession }
export default SessionProvider
