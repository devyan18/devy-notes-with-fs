import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useSetNote } from '../../../contexts/CurrentNoteProvider'
import { useGlobalPath } from '../../../contexts/GlobalPathProvider'
import { useContextMenu, useSetContextMenu } from '../../../contexts/MenuContextProvider'
import useNotes from '../../../hooks/useNotes'
import { Note as INote } from '../../../interfaces'
import { createDirLocal } from '../../../services/createFiles.local'
import NewFileIcon from '../../icons/NewFileIcon'
import NewFolderIcon from '../../icons/NewFolderIcon'
import Folder from '../Folder'
import FolderCreator from '../FolderCreator'
import Note from '../Note'
import NoteCreator from '../NoteCreator'
import styles from './styles.module.css'

export default function NoteList () {
  const globalPath = useGlobalPath()

  const queryClient = useQueryClient()

  const { data, isLoading, error } = useNotes(globalPath)
  const [viewFolderCreator, setViewFolderCreator] = useState<boolean>(false)
  const [viewFileCreator, setViewFileCreator] = useState<boolean>(false)
  const [dirname, setDirname] = useState<string>('')
  const [coords, setCoords] = useState({
    x: 0,
    y: 0
  })

  const setContextMenu = useSetContextMenu()
  const setCurrentNote = useSetNote()
  const contextMenu = useContextMenu()

  const toggleFolderCreator = () => {
    setViewFolderCreator(!viewFolderCreator)
  }

  const toggleFileCreator = () => {
    setViewFileCreator(!viewFileCreator)
  }

  const hanldeCloseNoteCreator = () => {
    setViewFileCreator(false)
  }

  const handleClickNote = (note: INote) => {
    setCurrentNote(note)
  }

  const handleChangeDirname = (dirname: string) => {
    setDirname(dirname)
  }

  const { mutate: handleCreateDir } = useMutation((name: string) => createDirLocal(globalPath, name), {
    onSuccess () {
      queryClient.invalidateQueries(['files'])
      toggleFolderCreator()
    }
  })

  const handleCreateFolder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleCreateDir(dirname)
  }

  if (error) {
    return <div>Error al leer los archivos</div>
  }

  return (
    <>
      {
        !isLoading
          ? (
          <div
            className={styles.noteList}
            onContextMenu={(e) => {
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
            }}
            onClick={(e) => {
              e.preventDefault()
            }}
          >

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

            <div className={styles.toolsBar}>
              <button onClick={toggleFolderCreator} className={styles.buttonTools}>
                <NewFolderIcon />
              </button>
              <button
              onClick={toggleFileCreator}
                className={styles.buttonTools}>
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
            {
              viewFileCreator &&
              <NoteCreator
                folder={''}
                onClose={hanldeCloseNoteCreator}
              />
            }
          </div>)
          : (
          <p>loading...</p>
            )
      }
    </>

  )
}
