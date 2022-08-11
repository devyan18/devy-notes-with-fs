import { useSetNote } from '../../../contexts/CurrentNoteProvider'
import useNotes from '../../../hooks/useNotes'
import { Note as INote } from '../../../interfaces'
import Folder from '../Folder'
import Note from '../Note'
import styles from './styles.module.css'

export default function NoteList () {
  const { notes, folders } = useNotes()

  const setCurrentNote = useSetNote()
  console.log(folders)
  const handleClickNote = (note: INote) => {
    setCurrentNote(note)
  }

  return (
    <div className={styles.noteList} onContextMenu={(e) => {
      e.preventDefault()
      e.stopPropagation()
      console.log(e.pageX, e.pageY)
    }}>
      <div className={styles.toolsBar}>
        <button className={styles.buttonTools}><svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 4)"><path d="m.5 1.5v9c0 1.1045695.8954305 2 2 2h10c1.1045695 0 2-.8954305 2-2v-6.00280762c.000802-1.1045695-.8946285-2-1.999198-2-.0002674 0-.0005348.00000006-.0008018.00080218l-5.0000002.00200544-2-2h-4c-.55228475 0-1 .44771525-1 1z"/><path d="m5.5 7.5h4"/><path d="m7.5 9.556v-4.056"/></g></svg></button>
        <button className={styles.buttonTools}><svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 3)"><path d="m7 1.5h-4.5c-1.1045695 0-2 .8954305-2 2v9.0003682c0 1.1045695.8954305 2 2 2h10c1.1045695 0 2-.8954305 2-2v-4.5003682"/><path d="m14.5.46667982c.5549155.5734054.5474396 1.48588056-.0167966 2.05011677l-6.9832034 6.98320341-3 1 1-3 6.9874295-7.04563515c.5136195-.5178979 1.3296676-.55351813 1.8848509-.1045243z"/><path d="m12.5 2.5.953 1"/></g></svg></button>
      </div>
      {
        !folders.length && !notes.length &&
        <div>not files</div>
      }
      {
        folders.length > 0 &&
        folders.map((e) => {
          return <Folder onClickNote={handleClickNote} key={e._id} _id={e._id || ''} title={e.fileName} files={e.files} />
        })
      }
      {
        notes.length > 0 &&
        notes.map((e) => {
          return <Note key={e._id} title={e.file.title} content={e.file.content} note={e} onClick={handleClickNote}/>
        })
      }
    </div>
  )
}
