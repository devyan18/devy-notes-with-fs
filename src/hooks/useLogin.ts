import React, { useState } from 'react'
import { useSetSession } from '../contexts/SessionProvider'
import { fetchingTokenByCredentials } from '../services/api.public'

interface Params {
  email: string
  password: string
}

export default function useLogin () {
  const setSession = useSetSession()

  const initialParams = {
    email: '',
    password: ''
  }

  const [params, setParams] = useState<Params>(initialParams)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleChangeParams = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParams({
      ...params,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    fetchingTokenByCredentials(params.email, params.password)
      .then(response => {
        if (response) {
          console.log(response)
          window.localStorage.setItem('token', response.token)
          setSession({
            token: response.token,
            user: response.user
          })
        }
      })
      .catch(error => {
        setError(error.message)
      })
      .finally(() => setLoading(false))
  }

  return {
    handleChangeParams,
    handleSubmit,
    loading,
    params,
    error
  }
}
