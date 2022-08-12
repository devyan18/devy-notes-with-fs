import { useNote } from '../../../contexts/CurrentNoteProvider'
import { Note as INote } from '../../../interfaces'
import styles from './styles.module.css'

interface Props {
  note: INote
  title: string
  content: string
  onClick: (note: INote) => void
  inFolder?: boolean
}

export default function Note (props: Props) {
  const note = useNote()

  return (
    <div
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
      } onClick={() => props.onClick(props.note)}>
      <p className={styles.title}>
        <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fillRule="evenodd" stroke="#444" strokeLinecap="round" strokeLinejoin="round" transform="translate(4 3)"><path d="m3.5 1.5c-.42139382 0-1.08806048 0-2 0-.55228475 0-1 .44771525-1 1v11c0 .5522848.44771525 1 1 1h10c.5522847 0 1-.4477152 1-1v-11c0-.55228475-.4477153-1-1-1-.8888889 0-1.55555556 0-2 0"/><path d="m4.5.5h4c.55228475 0 1 .44771525 1 1s-.44771525 1-1 1h-4c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1z"/><path d="m5.5 5.5h5"/><path d="m5.5 8.5h5"/><path d="m5.5 11.5h5"/><path d="m2.5 5.5h1"/><path d="m2.5 8.5h1"/><path d="m2.5 11.5h1"/></g></svg> {props.title}</p>
    </div>
  )
}
