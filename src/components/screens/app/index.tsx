import styles from './styles.module.css'
import MyEditor from '../../layouts/Editor'
import NoteList from '../../layouts/NoteList'
import { useNote, useSetNote } from '../../../contexts/CurrentNoteProvider'
import { useSetContextMenu } from '../../../contexts/MenuContextProvider'

export default function index () {
  const setNote = useSetNote()

  const note = useNote()

  const setContextMenu = useSetContextMenu()

  const setDoc = (doc: string) => {
    setNote({
      ...note,
      file: {
        ...note.file,
        content: doc
      }
    })
  }

  const closeContext = () => {
    setContextMenu({
      view: false,
      name: ''
    })
  }

  return (
    <div className={styles.containerLayout} onClick={closeContext}>
      <div className={styles.topbar}>
        <ul className={styles.nav}>
          <button className={styles.navBtn}>save</button>
          <button className={styles.navBtn}>clear</button>
        </ul>
      </div>
      <div className={styles.containerApp}>
        <div className={styles.editor}>
          <MyEditor
            doc={note.file.content}
            onChange={(doc) => setDoc(doc)}
          />
        </div>
        <div className={styles.sidebar} >
          <NoteList />
        </div>
      </div>
    </div>
  )
}
