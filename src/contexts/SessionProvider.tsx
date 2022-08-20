import {
  useState,
  useEffect,
  createContext,
  useContext
} from 'react'
import { Session, SessionContext } from '../interfaces'
import { getAuthHost } from '../utils/getAuthHost'

const Context = createContext<SessionContext>({
  session: {
    token: null
  },
  setSession: () => {}
})

interface Props {
  children: JSX.Element | Array<JSX.Element>
}

const fetchingUser = (token: string) => {
  return fetch(`${getAuthHost()}/token`, {
    method: 'POST',
    headers: {
      Authorization: token
    }
  })
    .then(res => res.json())
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
      fetchingUser(token)
        .then(user => {
          setSession(prev => {
            return {
              ...prev,
              user
            }
          })
        })
    }
  }, [])

  useEffect(() => {
    console.log(session)
  }, [session])

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
