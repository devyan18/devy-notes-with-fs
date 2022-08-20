import styles from './styles.module.css'
import MyEditor from '../../layouts/Editor'
import NoteList from '../../layouts/NoteList'
import { confirm } from '@tauri-apps/api/dialog'
import { useFolder, useNote, useSetNote } from '../../../contexts/CurrentNoteProvider'
import { useSetContextMenu } from '../../../contexts/MenuContextProvider'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import writeNoteLocal from '../../../services/writeFiles.local'
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification'
import deleteLocalNote from '../../../services/deleteFile.local'
import { useGlobalPath } from '../../../contexts/GlobalPathProvider'
import { useState } from 'react'
import PreviewCard from '../../layouts/PreviewCard.tsx'
import { useSession } from '../../../contexts/SessionProvider'

export default function index () {
  const setNote = useSetNote()
  const note = useNote()
  const folder = useFolder()
  const queryClient = useQueryClient()
  const globalPath = useGlobalPath()

  const [viewPreview, setViewPreview] = useState<boolean>(false)

  const togglePreview = () => setViewPreview(prev => !prev)

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

  const { mutate: saveNote } = useMutation(() => writeNoteLocal(globalPath, folder, note), {
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

  const { mutate: deleteNote } = useMutation(() => deleteLocalNote(globalPath, folder, note.fileName), {
    onSuccess () {
      queryClient.invalidateQueries(['files'])
    }
  })

  const handleDeleteNote = async () => {
    const confirmed = await confirm('Are you sure?', 'Devy - Notes')
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
  const session = useSession()

  return (
    <>
      {
        viewPreview &&
        <div className={styles.preview} onMouseDown={togglePreview}>
          <PreviewCard onClose={togglePreview}/>
        </div>
      }
      <div className={styles.containerLayout} onClick={closeContext}>
        <div className={styles.topbar}>
          <ul className={styles.nav}>
            <button className={styles.navBtn} onClick={handleSaveNote} title={'Save new content note'}>Save</button>
            <button className={styles.navBtn} onClick={handleClearContent} title={'Clear note content'}>Clear</button>
            <button className={styles.navBtn} onClick={handleDeleteNote} title={'Delete note'}>Delete</button>
            {
              note.file.content !== '' &&
              <button className={styles.navBtn} onClick={togglePreview} title={'Reading mode'}>Reading</button>
            }
            {
              session.user?.username
                ? <button className={styles.navBtn} onClick={() => {}} title={'Sync in the devy-cloud'}>Sync</button>
                : <button className={styles.navBtnDiss} disabled title={'Login required'}>Sync</button>
            }
          </ul>
        </div>
        <div className={styles.containerApp}>
          <div className={styles.sidebar} >
            <NoteList />
            <div>
              hola mundo
            </div>
          </div>
          <div className={styles.editor} onKeyDownCapture={handleSubmit}>
            <div className={styles.backgroundTitle}>
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
        </div>
      </div>
    </>
  )
}
