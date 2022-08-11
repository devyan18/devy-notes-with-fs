import styles from './styles.module.css'
import MenuContextProvider from '../../../contexts/MenuContextProvider'
import MyEditor from '../../layouts/Editor'
import NoteList from '../../layouts/NoteList'
import { useNote, useSetNote } from '../../../contexts/CurrentNoteProvider'

export default function index () {
  const setNote = useSetNote()

  const note = useNote()

  const setDoc = (doc: string) => {
    setNote({
      ...note,
      file: {
        ...note.file,
        content: doc
      }
    })
  }

  return (
    <MenuContextProvider>
      <div className={styles.containerLayout}>
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

        <div className={styles.sidebar}>
          <NoteList />
        </div>
      </div>
         </div>
    </MenuContextProvider>
  )
}
