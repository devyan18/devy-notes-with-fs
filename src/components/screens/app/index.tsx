import styles from './styles.module.css'
import MyEditor from '../../layouts/Editor'
import NoteList from '../../layouts/NoteList'
import { open, confirm } from '@tauri-apps/api/dialog'
import { useFolder, useNote, useSetNote } from '../../../contexts/CurrentNoteProvider'
import { useSetContextMenu } from '../../../contexts/MenuContextProvider'

import { documentDir } from '@tauri-apps/api/path'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import writeNoteLocal from '../../../services/writeFiles.local'
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification'
import deleteLocalNote from '../../../services/deleteFile.local'

export default function index () {
  const setNote = useSetNote()
  const note = useNote()
  const folder = useFolder()
  const queryClient = useQueryClient()

  const noteSavedToast = async () => {
    let permissionGranted = await isPermissionGranted()
    if (!permissionGranted) {
      const permissions = await requestPermission()
      permissionGranted = permissions === 'granted'
    }
    if (permissionGranted) {
      sendNotification('Note saved!')
    }
  }

  const selectDirectory = async () => {
    const selected = await open({
      directory: true,
      multiple: false,
      defaultPath: await documentDir()
    })
    if (selected) {
      localStorage.setItem('path', selected as string)
      queryClient.invalidateQueries(['files'])
      setNote({
        _id: '',
        fileName: '',
        file: {
          content: '',
          title: ''
        }
      })
    }
  }

  const { mutate: saveNote } = useMutation(() => writeNoteLocal(folder, note), {
    onSuccess () {
      queryClient.invalidateQueries(['files'])
    }
  })

  const handleSaveNote = () => {
    saveNote()
    noteSavedToast()
  }

  const setContextMenu = useSetContextMenu()

  const setDoc = (doc: string) => {
    setNote({
      ...note,
      file: {
        ...note.file,
        content: doc
      }
    })
  }

  const closeContext = () => {
    setContextMenu({
      view: false,
      name: ''
    })
  }

  const handleSubmit = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 's' && e.ctrlKey) {
      handleSaveNote()
    }
  }

  const handleClearContent = () => {
    setNote({
      ...note,
      file: {
        ...note.file,
        content: ''
      }
    })
  }

  const { mutate: deleteNote } = useMutation(() => deleteLocalNote(folder, note.fileName), {
    onSuccess () {
      queryClient.invalidateQueries(['files'])
    }
  })

  const handleDeleteNote = async () => {
    const confirmed = await confirm('Are you sure?', 'Tauri')
    if (confirmed) {
      deleteNote()
      setNote({
        _id: '',
        fileName: '',
        file: {
          content: '',
          title: ''
        }
      })
    }
  }

  return (
    <div className={styles.containerLayout} onClick={closeContext}>
      <div className={styles.topbar}>
        <ul className={styles.nav}>
          <button className={styles.navBtn} onClick={selectDirectory}>Folder</button>
          <button className={styles.navBtn} onClick={handleSaveNote}>Save</button>
          <button className={styles.navBtn} onClick={handleClearContent}>Clear</button>
          <button className={styles.navBtn} onClick={handleDeleteNote}>Delete</button>
        </ul>
      </div>
      <div className={styles.containerApp}>
        <div className={styles.editor} onKeyDownCapture={handleSubmit}>
          <div className={styles.backgroundTitle}>
            {
              folder && (
                <>
                  <span className={styles.folder}>{folder}</span>
                  <span className={styles.slash}>/</span>
                </>
              )
            }
            <input
              spellCheck={false}
              className={styles.folderName}
              value={note.file.title}
              type="text" onChange={(e) => setNote({
                ...note,
                file: {
                  ...note.file,
                  title: e.target.value
                }
              })}
            />
          </div>
          {
            note.fileName !== '' &&
            <MyEditor
              doc={note.file.content}
              onChange={(doc) => setDoc(doc)}
            />
          }
        </div>
        <div className={styles.sidebar} >
          <NoteList />
        </div>
      </div>
    </div>
  )
}
