export interface User {
  avatar: string,
  username: string,
  email: string
}

export interface Session {
  user?: User
  token: string | null
}

export interface SessionContext {
  session: Session
  setSession: React.Dispatch<React.SetStateAction<Session>>
}

export interface Group {
  _id?: string
  title?: string
  icon?: string
}

export interface GroupContext {
  group: Group
  setGroup: React.Dispatch<React.SetStateAction<Group>>
}

export interface File {
  title: string
  content: string
}

export interface Note {
  _id: string
  fileName: string
  file: File
}

export interface Folder {
  _id?: string
  fileName: string
  files: Array<Note> | null
}

export interface NoteContext {
  folder?:string,
  setFolder: React.Dispatch<React.SetStateAction<string>>
  note: Note
  setNote: React.Dispatch<React.SetStateAction<Note>>
}
