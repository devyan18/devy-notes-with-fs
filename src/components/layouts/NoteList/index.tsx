import { useState } from 'react'
import { useSession } from '../../../contexts/SessionProvider'
import NewFileIcon from '../../icons/NewFileIcon'
import NewFolderIcon from '../../icons/NewFolderIcon'
import CloudFiles from '../CloudFiles'
import LocalFiles from '../LocalFiles'
import styles from './styles.module.css'

export default function NoteList () {
  const session = useSession()

  const [viewFolderCreator, setViewFolderCreator] = useState<boolean>(false)

  const toggleFolderCreator = () => {
    setViewFolderCreator(!viewFolderCreator)
  }

  return (
    <div
      className={styles.noteList}
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      <div className={styles.toolsBar}>
        <button onClick={toggleFolderCreator} className={styles.buttonTools}>
          <NewFolderIcon />
        </button>
        <button
          className={styles.buttonTools}>
          <NewFileIcon />
        </button>
      </div>
      {
        session.user?.username && (
          <CloudFiles />
        )
      }
      <LocalFiles/>
    </div>
  )
}
