import styles from './styles.module.css'
import { FileData } from '../../../hooks/useNotes'
import Note from '../Note'
import { useState } from 'react'
import { useContextMenu, useSetContextMenu } from '../../../contexts/MenuContextProvider'
import NoteCreator from '../NoteCreator'
import ToggleArrow from '../../icons/ToggleArrow'
import FolderIcon from '../../icons/FolderIcon'
import NoteIcon from '../../icons/NoteIcon'
import TrashIcon from '../../icons/TrashIcon'
import { removeDir } from '@tauri-apps/api/fs'
import { confirm } from '@tauri-apps/api/dialog'
import { useQueryClient } from '@tanstack/react-query'
import { useFolder } from '../../../contexts/CurrentNoteProvider'
import getSlash from '../../../utils/getSlash'
import { useGlobalPath } from '../../../contexts/GlobalPathProvider'

interface Props {
  _id: string
  title: string
  files: Array<FileData> | null
  onClickNote: (note: FileData) => void
}

interface Coords {
  x: number
  y: number
}

export default function Folder (props: Props) {
  const [isOpenFolderCreator, setInOpenFolderCreator] = useState<boolean>(false)
  const [coords, setCoords] = useState<Coords>()
  const [noteCreator, setNoteCreator] = useState<boolean>(false)

  const globalPath = useGlobalPath()

  const contextMenu = useContextMenu()
  const setContextMenu = useSetContextMenu()

  const currentFolder = useFolder()

  const queryClient = useQueryClient()

  const toggleOpenFolder = (setter: string | undefined = '') => {
    if (setter === 'true') {
      setInOpenFolderCreator(true)
    } else if (setter === 'false') {
      setInOpenFolderCreator(false)
    } else {
      setInOpenFolderCreator(!isOpenFolderCreator)
    }
  }

  const handleOpenContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    toggleOpenFolder('true')
    setContextMenu({
      view: false,
      name: ''
    })
    e.preventDefault()
    e.stopPropagation()
    setContextMenu({
      view: true,
      name: `createChildren ${props.title}`
    })
    setCoords({
      x: e.pageX - 300,
      y: e.pageY
    })
  }

  const hanldeCloseNoteCreator = () => {
    setNoteCreator(false)
  }

  const handleDeleteDirectory = async () => {
    const slash = await getSlash()

    const path = `${globalPath}${slash}${props.title}`

    const isConfirmed = await confirm('Are you sure you want to delete this folder?', { title: 'Devy - Notes', type: 'warning' })

    if (isConfirmed) {
      await removeDir(path, { recursive: true })
      queryClient.invalidateQueries(['files'])
    }
  }

  return (
    <div className={styles.container} onContextMenu={handleOpenContextMenu}>
      {
        contextMenu.view === true && contextMenu.name === `createChildren ${props.title}` && coords?.x && coords?.y &&
        <div className={styles.contextMenu} style={{ top: coords?.y, left: coords?.x }}>
          <button className={styles.contextMenuOption} onClick={() => setNoteCreator(true)}>
            <NoteIcon />
            <span>create note</span>
          </button>
          <button className={styles.contextMenuOption} onClick={handleDeleteDirectory}>
            <TrashIcon />
            <span>Delete Folder</span>
          </button>
        </div>
      }

      <div
        className={
            contextMenu.view === true && contextMenu.name === `createChildren ${props.title}`
              ? styles.folderHover
              : styles.folder
          }
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toggleOpenFolder()
          setContextMenu({
            view: false,
            name: ''
          })
        }}>
        <p className={styles.titleFolder}>
          <ToggleArrow isOpen={isOpenFolderCreator} />
          {
            currentFolder === props.title
              ? <FolderIcon fill='currentColor' />
              : <FolderIcon />
          }
          <span className={styles.titleFolderText}>{props.title}</span>
        </p>
      </div>
        {
          noteCreator &&
          <NoteCreator
            folder={props.title}
            onClose={hanldeCloseNoteCreator}
          />
        }
        {
          isOpenFolderCreator && (
            <div className={styles.inFolderContainer}>
              <div className={styles.containerFiles}>
              {
                props.files && props.files.map((e) => {
                  return (
                    <Note
                      inFolder={true}
                      key={e._id}
                      title={e.file.title}
                      content={e.file.content}
                      note={e}
                      onClick={props.onClickNote}
                      folderName={props.title}
                    />
                  )
                })
              }
              </div>

            </div>
          )
        }
    </div>
  )
}
/*

*/
