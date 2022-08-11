import React, { useState } from 'react'
import { useSetSession } from '../contexts/SessionProvider'
import { getAuthHost } from '../utils/getAuthHost'

interface Params {
  email: string
  password: string
}

const fetchingAuthToken = (params: Params) => {
  return fetch(`${getAuthHost()}/login`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
}

export default function useLogin () {
  const setSession = useSetSession()

  const initialParams = {
    email: '',
    password: ''
  }

  const [params, setParams] = useState<Params>(initialParams)
  const [loading, setLoading] = useState<Boolean>(false)

  const handleChangeParams = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParams({
      ...params,
      [event.target.name]: event.target.value
    })
  }

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    fetchingAuthToken(params)
      .then(response => {
        if (response) {
          window.localStorage.setItem('token', response.token)
          setLoading(false)
          setSession({
            token: response.token
          })
        }
      })
  }

  return { handleChangeParams, params, handleLogin, loading }
}
