import { useEffect, useState } from 'react'
import { useSession } from './contexts/SessionProvider'

import CurrentNoteProvider from './contexts/CurrentNoteProvider'
import MenuContextProvider from './contexts/MenuContextProvider'

import Application from './components/screens/app'
import Auth from './components/screens/auth'

import './App.css'

import {
  isPermissionGranted,
  requestPermission,
  sendNotification
} from '@tauri-apps/api/notification'

function App () {
  const session = useSession()

  const [offline, setOffline] = useState<boolean>(false)

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
    localStorage.clear()
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
