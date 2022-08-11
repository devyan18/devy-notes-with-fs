import styles from './styles.module.css'
import { FileData } from '../../../hooks/useNotes'
import Note from '../Note'
import { useState } from 'react'

interface Props {
  _id: string
  title: string
  files: Array<FileData> | null
  onClickNote: (note: FileData) => void
}

export default function Folder (props: Props) {
  const [isOpen, setInOpen] = useState<boolean>(false)

  const toggleOpenFolder = () => {
    setInOpen(!isOpen)
  }

  return (
    <div className={styles.container}>
      <div className={styles.folder} onClick={toggleOpenFolder}>
      <p className={styles.titleFolder}>
        {
          isOpen
            ? (
            <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><path d="m8.5.5-4 4-4-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(6 8)"/></svg>
              )
            : (
            <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><path d="m.5 8.5 4-4-4-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(9 6)"/></svg>
              )
        }
        <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 4)"><path d="m.5 1.5v9c0 1.1045695.8954305 2 2 2h10c1.1045695 0 2-.8954305 2-2v-6.00280762c.0007656-1.05436179-.8150774-1.91816512-1.8499357-1.99451426l-.1500643-.00468356-5 .00200544-2-2h-4c-.55228475 0-1 .44771525-1 1z"/><path d="m.5 2.5h7"/></g></svg>
        {props.title}
      </p>
      </div>
        {
          isOpen && (
            <div className={styles.inFolderContainer}>
              <div className={styles.containerFiles}>
              {
                props.files && props.files.map((e) => {
                  return (
                    <Note
                      inFolder={true}
                      key={e._id}
                      title={e.file.title}
                      content={e.file.content}
                      note={e}
                      onClick={props.onClickNote}
                    />
                  )
                })
              }
              </div>

            </div>
          )
        }
    </div>
  )
}
/*

*/
