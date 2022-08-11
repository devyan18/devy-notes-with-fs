import { getNotesHost } from './getNotesHost'

export const getNotes = (token: string) => {
  return fetch(`${getNotesHost()}/api/v1/notes/`, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
}

export interface newNote {
  title: string
  content: string
  group: string
  token: string
}

export const createNewNote = ({ title, content, group, token }: newNote) => {
  return fetch(`${getNotesHost()}/api/v1/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({ title, content, group })
  })
    .then(res => res.json())
}

export const getGroups = (token: string) => {
  return fetch(`${getNotesHost()}/api/v1/groups`, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
}

interface CreateGroup {
  title: string
  token: string
}

export const createGroup = (props: CreateGroup) => {
  const { title, token } = props

  return fetch(`${getNotesHost()}/api/v1/groups`, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title })
  })
    .then(res => res.json())
}

interface updateData {
  token: string
  _id: string
  title: string
  content: string
}

export const updateNote = ({ _id, title, content, token }: updateData) => {
  return fetch(`${getNotesHost()}/api/v1/notes/${_id}`, {
    method: 'PUT',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, content })
  })
    .then(res => res.json())
}

export const deleteNote = ({ _id, token }: { _id: string, token: string }) => {
  return fetch(`${getNotesHost()}/api/v1/notes/${_id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
}

export const deleteGroup = ({ _id, token }: { _id: string, token: string }) => {
  return fetch(`${getNotesHost()}/api/v1/groups/${_id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
}
