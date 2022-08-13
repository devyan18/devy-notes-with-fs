import CloseIcon from '../../icons/CloseIcon'
import FolderIcon from '../../icons/FolderIcon'
import styles from './styles.module.css'

interface Props {
  dirname: string
  onChange: (dirname: string) => void
  onClose: () => void
  onSubmit: (e:React.FormEvent<HTMLFormElement>) => void
}

export default function FolderCreator (props: Props) {
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => { props.onSubmit(e) }}>
        <FolderIcon />
        <input
          autoFocus
          className={styles.input}
          type="text"
          value={props.dirname}
          onChange={e => props.onChange(e.target.value)}
        />
        <button className={styles.button} type="button" onClick={props.onClose}>
          <CloseIcon />
        </button>
      </form>
    </div>
  )
}
