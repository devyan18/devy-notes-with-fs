import './App.css'
import { useSession } from './contexts/SessionProvider'
import Application from './components/screens/app'
import Auth from './components/screens/auth'
import CurrentNoteProvider from './contexts/CurrentNoteProvider'
import { useEffect, useState } from 'react'
import { createDir, BaseDirectory } from '@tauri-apps/api/fs'
import MenuContextProvider from './contexts/MenuContextProvider'

function App () {
  const session = useSession()

  const [offline, setOffline] = useState<boolean>(false)

  const createNotesDirectory = async () => {
    await createDir('notes', { dir: BaseDirectory.Document, recursive: true })
  }

  const handleSetOffline = () => {
    setOffline(true)
  }

  useEffect(() => {
    createNotesDirectory()
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
