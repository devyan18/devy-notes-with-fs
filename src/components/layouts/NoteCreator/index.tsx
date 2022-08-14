import styles from './styles.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { createFileLocal } from '../../../services/createFiles.local'
import NoteIcon from '../../icons/NoteIcon'
import CloseIcon from '../../icons/CloseIcon'
import { useGlobalPath } from '../../../contexts/GlobalPathProvider'

interface Props {
  folder: string
  onClose: () => void
}

export default function NoteCreator (props: Props) {
  const queryClient = useQueryClient()

  const globalPath = useGlobalPath()

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
    onSuccess () {
      queryClient.invalidateQueries(['files'])
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = initialData()
    mutate({
      localPath: globalPath,
      name: data.title,
      content: data,
      folder: props.folder
    })
    props.onClose()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <NoteIcon />
      <input type="text" className={styles.input} onChange={e => setTitle(e.target.value)} autoFocus={true}/>
      <button onClick={props.onClose} className={styles.button} type="button">
        <CloseIcon/>
      </button>
    </form>
  )
}
