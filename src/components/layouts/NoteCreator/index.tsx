import styles from './styles.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { createFileLocal } from '../../../services/createFiles.local'
// Write a text file to the `$APPDIR/app.conf` path

interface Props {
  folder: string
  onClose: () => void
}

export default function NoteCreator (props: Props) {
  const queryClient = useQueryClient()

  const [title, setTitle] = useState<string>('')

  const initialData = () => {
    const newId = uuidv4()

    const data = {
      _id: newId,
      title,
      fileName: title,
      content: '# Hello World!'
    }

    return data
  }

  const { mutate } = useMutation(createFileLocal, {
    onSuccess (data, variables, context) {
      queryClient.invalidateQueries(['files'])
      console.log(JSON.parse(data))
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = initialData()
    mutate({
      name: data.title,
      content: data,
      folder: props.folder
    })
    props.onClose()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fillRule="evenodd" stroke="#444" strokeLinecap="round" strokeLinejoin="round" transform="translate(4 3)"><path d="m3.5 1.5c-.42139382 0-1.08806048 0-2 0-.55228475 0-1 .44771525-1 1v11c0 .5522848.44771525 1 1 1h10c.5522847 0 1-.4477152 1-1v-11c0-.55228475-.4477153-1-1-1-.8888889 0-1.55555556 0-2 0"/><path d="m4.5.5h4c.55228475 0 1 .44771525 1 1s-.44771525 1-1 1h-4c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1z"/><path d="m5.5 5.5h5"/><path d="m5.5 8.5h5"/><path d="m5.5 11.5h5"/><path d="m2.5 5.5h1"/><path d="m2.5 8.5h1"/><path d="m2.5 11.5h1"/></g></svg>
      <input type="text" className={styles.input} onChange={e => setTitle(e.target.value)}/>
      <button onClick={props.onClose} className={styles.button} type="button"><svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 7.5 6 6"/><path d="m13.5 7.5-6 6"/></g></svg></button>
    </form>
  )
}
