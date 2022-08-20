import { useState } from 'react'
import { useNote, useSetFolder, useSetNote } from '../../../contexts/CurrentNoteProvider'
import { useContextMenu, useSetContextMenu } from '../../../contexts/MenuContextProvider'
import { Note as INote } from '../../../interfaces'
import NoteIcon from '../../icons/NoteIcon'
import TrashIcon from '../../icons/TrashIcon'
import styles from './styles.module.css'
import { open } from '@tauri-apps/api/shell'
import { confirm, save } from '@tauri-apps/api/dialog'
import DocumentIcon from '../../icons/DocumentIcon'
import PageIcon from '../../icons/PageIcon'
import exportFileToMarkdown from '../../../services/exportToMarkdown.local'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import deleteLocalNote from '../../../services/deleteFile.local'
import { useGlobalPath } from '../../../contexts/GlobalPathProvider'
import getSlash from '../../../utils/getSlash'

interface Props {
  note: INote
  title: string
  content: string
  onClick: (note: INote) => void
  inFolder?: boolean
  folderName?: string
}

export default function Note (props: Props) {
  const setNote = useSetNote()
  const queryClient = useQueryClient()
  const setContextMenu = useSetContextMenu()
  const contextMenu = useContextMenu()

  const globalPath = useGlobalPath()

  const [coords, setCoords] = useState({
    x: 0,
    y: 0
  })

  const setFolder = useSetFolder()

  const note = useNote()

  const handleRevealLocationFile = async () => {
    const slash = await getSlash()

    let path = `${globalPath}`

    if (props.inFolder) {
      path += `${props.folderName}${slash}`
    }

    path += `${props.note.fileName}`

    open(path)
  }

  const handleExportNoteToMarkdown = async () => {
    const filePath = await save({
      title: `Export "${props.title}" to Markdown`,
      filters: [{
        name: `${props.title}.md`,
        extensions: ['md']
      }]
    })

    if (filePath) {
      exportFileToMarkdown(filePath, props.content)
    }
  }

  const { mutate: deleteFile } = useMutation(() => deleteLocalNote(globalPath, props.folderName, props.note.fileName), {
    onSuccess () {
      queryClient.invalidateQueries(['files'])
      setNote({
        _id: '',
        fileName: '',
        file: {
          content: '',
          title: ''
        }
      })
      setFolder('')
    }
  })

  const handleDeleteNote = async () => {
    const confirmed = await confirm('Are you sure?', 'Devy - Notes')
    if (confirmed) {
      deleteFile()
    }
  }

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setContextMenu({
          view: true,
          name: `${props.folderName}/${props.title}`
        })
        setCoords({
          x: e.pageX,
          y: e.pageY
        })
      }}
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
      } onClick={() => {
        props.onClick(props.note)
        setFolder(props.folderName || '')
      }}>
      {
        contextMenu.view && contextMenu.name === `${props.folderName}/${props.title}` &&
        <div className={styles.contextMenu} style={{ top: coords.y, left: coords.x }}>
          <button
            className={styles.contextMenuOption}
            onClick={handleRevealLocationFile}
          >
            <DocumentIcon />
            <span>Open File</span>
          </button>
          <button
            onClick={handleDeleteNote}
            className={styles.contextMenuOption}>
            <TrashIcon />
            <span>Delete Note</span>
          </button>
          <button
            className={styles.contextMenuOption}
            onClick={handleExportNoteToMarkdown}
          >
            <PageIcon />
            <span>Export to Markdown</span>
          </button>
        </div>
      }

      <p className={styles.title}>
        {
          note._id === props.note._id
            ? <NoteIcon />
            : <NoteIcon fill='none' stroke='currentColor'/>
        }
        <span className={styles.titleText}>{props.title}</span>
      </p>
    </div>
  )
}
