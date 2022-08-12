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
        <svg
          height="21"
          viewBox="0 0 21 21"
          width="21"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(3 4)"
          >
            <path
              d="m.5 1.5v9c0 1.1045695.8954305 2 2 2h10c1.1045695 0 2-.8954305 2-2v-6.00280762c.0007656-1.05436179-.8150774-1.91816512-1.8499357-1.99451426l-.1500643-.00468356-5 .00200544-2-2h-4c-.55228475 0-1 .44771525-1 1z"
            />
            <path d="m.5 2.5h7"/>
          </g>
        </svg>
        <input
          autoFocus
          className={styles.input}
          type="text"
          value={props.dirname}
          onChange={e => props.onChange(e.target.value)}
        />
        <button className={styles.button} type="button" onClick={props.onClose}>
          <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 7.5 6 6"/><path d="m13.5 7.5-6 6"/></g></svg>
        </button>
      </form>
    </div>
  )
}
