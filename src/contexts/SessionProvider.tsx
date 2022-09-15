import {
  useState,
  useEffect,
  createContext,
  useContext
} from 'react'
import { Session, SessionContext } from '../interfaces'
import { fetchingUserWithToken } from '../services/api.public'

const Context = createContext<SessionContext>({
  session: {
    token: null
  },
  setSession: () => {},
  loading: false
})

interface Props {
  children: JSX.Element | Array<JSX.Element>
}

const SessionProvider = (props: Props) => {
  const initialSession = {
    token: null
  }

  const [session, setSession] = useState<Session>(initialSession)

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      setLoading(true)
      fetchingUserWithToken(token)
        .then(response => {
          setSession({
            token,
            user: response.user
          })
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [])

  return (
    <Context.Provider value={{ session, setSession, loading }}>
      {props.children}
    </Context.Provider>
  )
}

const useSession = () => useContext(Context).session
const useIsSessionLoading = () => useContext(Context).loading
const useSetSession = () => useContext(Context).setSession

export { useSession, useSetSession, useIsSessionLoading }
export default SessionProvider
