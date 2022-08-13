import './App.css'
import { useSession } from './contexts/SessionProvider'
import Application from './components/screens/app'
import Auth from './components/screens/auth'
import CurrentNoteProvider from './contexts/CurrentNoteProvider'
import { useEffect, useState } from 'react'
import { createDir, BaseDirectory } from '@tauri-apps/api/fs'
import MenuContextProvider from './contexts/MenuContextProvider'

import { isRegistered } from '@tauri-apps/api/globalShortcut'
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification'

function App () {
  const registerKey = async () => {
    const data = await isRegistered('CommandOrControl+S')
    console.log(data)
  }

  const session = useSession()

  const [offline, setOffline] = useState<boolean>(false)

  const createNotesDirectory = async () => {
    await createDir('notes', { dir: BaseDirectory.Document, recursive: true })
  }

  const handleSetOffline = () => {
    localStorage.setItem('offline', 'true')
    setOffline(true)
  }

  const appIsReady = async () => {
    let permissionGranted = await isPermissionGranted()
    if (!permissionGranted) {
      const permissions = await requestPermission()
      permissionGranted = permissions === 'granted'
    }
    if (permissionGranted) {
      sendNotification('Tauri Notes Ready')
    }
  }

  useEffect(() => {
    registerKey()
    createNotesDirectory()
    appIsReady()
    const offLineMode = localStorage.getItem('offline')

    if (offLineMode) {
      setOffline(true)
    }
  }, [])

  return (
    <div className="App">
      {
        session.token || offline
          ? (
              <MenuContextProvider>
                <CurrentNoteProvider>
                  <Application />
                </CurrentNoteProvider>
              </MenuContextProvider>
            )
          : <Auth offLineSetter={handleSetOffline} />
      }
    </div>
  )
}

export default App
