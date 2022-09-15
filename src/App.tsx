import { useEffect, useState } from 'react'
import { useIsSessionLoading, useSession } from './contexts/SessionProvider'

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
import Loading from './components/layouts/Loading'

function App () {
  const session = useSession()

  const [offline, setOffline] = useState<boolean>(false)

  const isLoadingSession = useIsSessionLoading()

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
    appIsReady()

    const offLineMode = localStorage.getItem('offline')

    if (offLineMode) {
      setOffline(true)
    }
  }, [])

  if ((session.token && session.user?.username) || offline) {
    return (
      <MenuContextProvider>
        <CurrentNoteProvider>
          <Application />
        </CurrentNoteProvider>
      </MenuContextProvider>
    )
  }

  if (isLoadingSession) {
    return (
      <div className="loading-page">
        <Loading/>
      </div>
    )
  }

  return (
    <div className="App">
      <Auth offLineSetter={handleSetOffline} />
    </div>
  )
}

export default App
