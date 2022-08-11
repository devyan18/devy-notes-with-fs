import './App.css'
import { useSession } from './contexts/SessionProvider'
import Application from './components/screens/app'
import Auth from './components/screens/auth'
import CurrentNoteProvider from './contexts/CurrentNoteProvider'
import { useEffect } from 'react'
import { createDir, BaseDirectory } from '@tauri-apps/api/fs'

function App () {
  const session = useSession()

  const createNotesDirectory = async () => {
    await createDir('notes', { dir: BaseDirectory.Document, recursive: true })
  }

  useEffect(() => {
    createNotesDirectory()
  }, [])

  return (
    <div className="App">
      {
        session.token
          ? (
              <CurrentNoteProvider>
                <Application />
              </CurrentNoteProvider>
            )
          : <Auth />
      }
    </div>
  )
}

export default App
