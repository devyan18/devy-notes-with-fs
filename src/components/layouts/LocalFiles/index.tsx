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
import StorageIcon from '../../icons/StorageIcon'
import ToggleArrow from '../../icons/ToggleArrow'
import NewFolderIcon from '../../icons/NewFolderIcon'
import NewFileIcon from '../../icons/NewFileIcon'
import { useContextMenu, useSetContextMenu } from '../../../contexts/MenuContextProvider'

export default function LocalFiles () {
  const [isOpenLocalFiles, setIsOpenLocalFiles] = useState<boolean>(false)

  const setCurrentNote = useSetNote()
  const globalPath = useGlobalPath()

  const contextMenu = useContextMenu()
  const setContextMenu = useSetContextMenu()

  const queryClient = useQueryClient()

  const { data, isLoading, error } = useNotes()
  const [viewFolderCreator, setViewFolderCreator] = useState<boolean>(false)
  const [viewFileCreator, setViewFileCreator] = useState<boolean>(false)
  const [dirname, setDirname] = useState<string>('')

  const [coords, setCoords] = useState({
    x: 0,
    y: 0
  })

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

  const toggleFileCreator = () => {
    setViewFileCreator(!viewFileCreator)
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
      <div className={styles.localFiles} onClick={() => { setIsOpenLocalFiles(prev => !prev) }} onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setContextMenu({
          view: true,
          name: 'NoteList - contextMenu'
        })
        setCoords({
          x: e.pageX,
          y: e.pageY
        })
      }}>
        <p className={styles.title}>
          <ToggleArrow isOpen={isOpenLocalFiles}/>
          <StorageIcon stroke='#335' fill={'currentColor'} />
          <span>Local files</span>
        </p>
      </div>

      {
        contextMenu.view && contextMenu.name === 'NoteList - contextMenu' &&
        <div className={styles.contextMenu} style={{ top: coords.y, left: coords.x }}>
          <button
            onClick={toggleFolderCreator}
            className={styles.contextMenuOption}>
            <NewFolderIcon />
            <span>Create Folder</span>
          </button>
          <button
            onClick={toggleFileCreator}
            className={styles.contextMenuOption}>
            <NewFileIcon />
            <span>Create File</span>
          </button>
        </div>
      }
      {
        isOpenLocalFiles && (
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
        )
      }

    </div>
  )
}
