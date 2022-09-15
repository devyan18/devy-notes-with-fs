import { useState } from 'react'
import NewFileIcon from '../../icons/NewFileIcon'
import NewFolderIcon from '../../icons/NewFolderIcon'
import LocalFiles from '../LocalFiles'
import styles from './styles.module.css'
// import CloudFiles from '../CloudFiles'

export default function NoteList () {
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
      {/* <CloudFiles/> */}
      <LocalFiles/>
    </div>
  )
}
