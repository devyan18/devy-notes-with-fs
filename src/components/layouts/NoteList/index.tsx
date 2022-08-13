import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useSetNote } from '../../../contexts/CurrentNoteProvider'
import useNotes from '../../../hooks/useNotes'
import { Note as INote } from '../../../interfaces'
import { createDirLocal } from '../../../services/createFiles.local'
import NewFileIcon from '../../icons/NewFileIcon'
import NewFolderIcon from '../../icons/NewFolderIcon'
import Folder from '../Folder'
import FolderCreator from '../FolderCreator'
import Note from '../Note'
import styles from './styles.module.css'

export default function NoteList () {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useNotes()

  const [viewFolderCreator, setViewFolderCreator] = useState<boolean>(false)

  const [dirname, setDirname] = useState<string>('')

  const setCurrentNote = useSetNote()

  const toggleFolderCreator = () => {
    setViewFolderCreator(!viewFolderCreator)
  }

  const handleClickNote = (note: INote) => {
    setCurrentNote(note)
  }

  const handleChangeDirname = (dirname: string) => {
    setDirname(dirname)
  }

  const { mutate } = useMutation((name: string) => createDirLocal(name), {
    onSuccess () {
      queryClient.invalidateQueries(['files'])
      toggleFolderCreator()
    }
  })

  const handleCreateFolder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate(dirname)
  }

  if (error) {
    return <div>No anduvo nada capo</div>
  }

  return (
    <>
      {
        !isLoading
          ? (
          <div className={styles.noteList} onClick={(e) => {
            e.preventDefault()
            console.log('click a')
          }}>
            <div className={styles.toolsBar}>
              <button onClick={toggleFolderCreator} className={styles.buttonTools}>
                <NewFolderIcon />
              </button>
              <button className={styles.buttonTools}>
                <NewFileIcon />
              </button>
            </div>
            {
              !data?.mappedFolders.length && !data?.mappedNotes.length &&
              <div>not files</div>
            }
            {
              data?.mappedFolders &&
              data?.mappedFolders.length > 0 &&
              data?.mappedFolders.map((e) => {
                return <Folder onClickNote={handleClickNote} key={e._id} _id={e._id || ''} title={e.fileName} files={e.files} />
              })
            }
            {
              viewFolderCreator === true &&
              <FolderCreator
                dirname={dirname}
                onChange={handleChangeDirname}
                onClose={toggleFolderCreator}
                onSubmit={handleCreateFolder}
              />
            }
            {
              data?.mappedNotes &&
              data?.mappedNotes.length > 0 &&
              data?.mappedNotes.map((e) => {
                return <Note key={e._id} title={e.file.title} content={e.file.content} note={e} onClick={handleClickNote}/>
              })
            }
          </div>)
          : (
          <p>loading...</p>
            )
      }
    </>

  )
}
