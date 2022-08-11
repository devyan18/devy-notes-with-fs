import { useSetNote } from '../../../contexts/CurrentNoteProvider'
import useNotes from '../../../hooks/useNotes'
import { Note as INote } from '../../../interfaces'
import Note from '../Note'
import styles from './styles.module.css'

export default function NoteList () {
  const notes = useNotes()

  const setCurrentNote = useSetNote()

  const handleClickNote = (note: INote) => {
    setCurrentNote(note)
  }

  return (
    <div className={styles.noteList}>
      {
        notes.length > 0 &&
        notes.map((e) => {
          return <Note key={e._id} title={e.file.title} content={e.file.content} note={e} onClick={handleClickNote}/>
        })
      }
    </div>
  )
}
