import { getHost } from '../utils/getAuthHost'

const fetchingUserWithToken = async (token: string) => {
  return fetch(`${getHost()}/api/v1/auth/token`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json())
}

const fetchingTokenByCredentials = async (email: string, password: string) => {
  return fetch(`${getHost()}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(res => {
    return res.json()
  })
}

export {
  fetchingUserWithToken,
  fetchingTokenByCredentials
}
