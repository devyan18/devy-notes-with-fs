import { useEffect, useState } from 'react'
import { useSession, useSetSession } from '../contexts/SessionProvider'
import { getAuthHost } from '../utils/getAuthHost'

const fetchingUser = (token: string) => {
  return fetch(`${getAuthHost()}/token`, {
    method: 'POST',
    headers: {
      Authorization: token
    }
  })
    .then(res => res.json())
}

export default function useUser () {
  const session = useSession()
  const [process, setProcess] = useState(false)

  const setSession = useSetSession()

  useEffect(() => {
    setProcess(true)
    if (session.token) {
      fetchingUser(session.token)
        .then(user => setSession(prev => {
          setProcess(false)
          return { ...prev, user }
        }))
    }
  }, [])
  return { process }
}
