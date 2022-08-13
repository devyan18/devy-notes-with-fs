import { useNote, useSetFolder } from '../../../contexts/CurrentNoteProvider'
import { Note as INote } from '../../../interfaces'
import NoteIcon from '../../icons/NoteIcon'
import styles from './styles.module.css'

interface Props {
  note: INote
  title: string
  content: string
  onClick: (note: INote) => void
  inFolder?: boolean
  folderName?: string
}

export default function Note (props: Props) {
  const setFolder = useSetFolder()

  const note = useNote()

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(e.pageX, e.pageY)
      }}
      style={
        props.inFolder
          ? {
              width: '280px',
              paddingLeft: '20px'
            }
          : {}
      }
      className={
      note._id === props.note._id
        ? styles.note_active
        : styles.note
      } onClick={() => {
        props.onClick(props.note)
        console.log(props.note)
        setFolder(props.folderName || '')
      }}>
      <p className={styles.title}><NoteIcon /><span className={styles.titleText}>{props.title}</span></p>
    </div>
  )
}
