import {
  useState,
  createContext,
  useContext
} from 'react'
import { Note, NoteContext } from '../interfaces'

const Context = createContext<NoteContext>({
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

  return (
    <Context.Provider value={{ note, setNote }}>
      {props.children}
    </Context.Provider>
  )
}

const useNote = () => useContext(Context).note
const useSetNote = () => useContext(Context).setNote

export { useNote, useSetNote }
export default CurrentNoteProvider
