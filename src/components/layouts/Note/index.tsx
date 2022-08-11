import { useNote } from '../../../contexts/CurrentNoteProvider'
import { Note as INote } from '../../../interfaces'
import styles from './styles.module.css'

interface Props {
  note: INote
  title: string
  content: string
  onClick: (note: INote) => void
}

export default function Note (props: Props) {
  const note = useNote()

  return (
    <div className={note._id === props.note._id ? styles.note_active : styles.note} onClick={() => props.onClick(props.note)}>
      <p className={styles.title}>{props.title}</p>
      <span className={styles.content}>{props.content}</span>
    </div>
  )
}
