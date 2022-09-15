import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useSetNote } from '../../../contexts/CurrentNoteProvider'
import { useGlobalPath } from '../../../contexts/GlobalPathProvider'
import useNotes from '../../../hooks/useNotes'
import { createDirLocal } from '../../../services/createFiles.local'
import Folder from '../Folder'
import FolderCreator from '../FolderCreator'
import NoteCreator from '../NoteCreator'

import { Note as INote } from '../../../interfaces'
import Note from '../Note'

import styles from './styles.module.css'

export default function LocalFiles () {
  const setCurrentNote = useSetNote()
  const globalPath = useGlobalPath()

  const queryClient = useQueryClient()

  const { data, isLoading, error } = useNotes()
  const [viewFolderCreator, setViewFolderCreator] = useState<boolean>(false)
  const [viewFileCreator, setViewFileCreator] = useState<boolean>(false)
  const [dirname, setDirname] = useState<string>('')

  const toggleFolderCreator = () => {
    setViewFolderCreator(!viewFolderCreator)
  }

  const { mutate: handleCreateDir } = useMutation((name: string) => createDirLocal(globalPath, name), {
    onSuccess () {
      queryClient.invalidateQueries(['files'])
      toggleFolderCreator()
      setDirname('')
    }
  })

  const hanldeCloseNoteCreator = () => {
    setViewFileCreator(false)
  }

  const handleClickNote = (note: INote) => {
    setCurrentNote(note)
  }

  const handleChangeDirname = (dirname: string) => {
    setDirname(dirname)
  }

  const handleCreateFolder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleCreateDir(dirname)
  }

  if (error) {
    return (
      <div>
        <span>Error to loading files</span>
      </div>
    )
  }

  return (
    <div className={styles.localFilesContainer}>
      <>
        {
          !isLoading
            ? (
                <>
                {
                  data?.mappedFolders &&
                  data?.mappedFolders.length > 0 &&
                  data?.mappedFolders.map((e) => {
                    return <Folder onClickNote={handleClickNote} key={e._id} _id={e._id || ''} title={e.fileName} files={e.files} />
                  })
                }

                {
                  data?.mappedNotes &&
                  data?.mappedNotes.length > 0 &&
                  data?.mappedNotes.map((e) => {
                    return (
                      <Note
                        key={e._id}
                        title={e.file.title}
                        content={e.file.content}
                        note={e}
                        onClick={handleClickNote}
                      />
                    )
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
                  viewFileCreator &&
                  <NoteCreator
                    folder={''}
                    onClose={hanldeCloseNoteCreator}
                  />
                }
              </>
              )
            : (
                <div className={styles.loading}>
                  <span className={styles.loadingText}>Loading...</span>
                </div>
              )
        }
      </>
    </div>
  )
}
