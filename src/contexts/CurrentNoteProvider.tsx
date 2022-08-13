import {
  useState,
  createContext,
  useContext
} from 'react'
import { Note, NoteContext } from '../interfaces'

const Context = createContext<NoteContext>({
  setFolder: () => {},
  note: {
    _id: '',
    fileName: '',
    file: {
      title: '',
      content: ''
    }
  },
  setNote: () => {}
})

interface Props {
  children: JSX.Element | Array<JSX.Element>
}

const CurrentNoteProvider = (props: Props) => {
  const [note, setNote] = useState<Note>({
    _id: '',
    fileName: '',
    file: {
      title: '',
      content: ''
    }
  })

  const [folder, setFolder] = useState<string>('')

  return (
    <Context.Provider value={{ folder, note, setNote, setFolder }}>
      {props.children}
    </Context.Provider>
  )
}

const useNote = () => useContext(Context).note
const useSetNote = () => useContext(Context).setNote
const useFolder = () => useContext(Context).folder
const useSetFolder = () => useContext(Context).setFolder

export { useNote, useSetNote, useFolder, useSetFolder }
export default CurrentNoteProvider
