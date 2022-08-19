import { createContext, useContext, useState, useEffect } from 'react'
import { appDir, BaseDirectory } from '@tauri-apps/api/path'
import { createDir } from '@tauri-apps/api/fs'

interface IGlobalPathContext {
  setGlobalPath: (path: string) => void
  globalPath: string
}

const Context = createContext<IGlobalPathContext>({
  setGlobalPath: () => {},
  globalPath: ''
})

interface Props {
  children: JSX.Element | JSX.Element[]
}

const getAppDefaultDir = async () => {
  const dir = await appDir()
  const path = `${dir}devy-notes`
  return path
}

const createNotesDirectory = async () => {
  await createDir('devy-notes', { dir: BaseDirectory.App, recursive: true })
}

const GlobalPathProvider = (props: Props) => {
  const [globalPath, setGlobalPath] = useState<string>('')

  useEffect(() => {
    createNotesDirectory()
      .then(() => {
        const customPath = localStorage.getItem('custom-path')
        if (customPath) {
          setGlobalPath(customPath)
        } else {
          getAppDefaultDir()
            .then((e) => {
              setGlobalPath(e)
            })
        }
      })
  }, [])

  return (
    <Context.Provider value={{ globalPath, setGlobalPath }}>
      {props.children}
    </Context.Provider>
  )
}

const useGlobalPath = () => useContext(Context).globalPath
const useSetGlobalPath = () => useContext(Context).setGlobalPath

export { useGlobalPath, useSetGlobalPath }
export default GlobalPathProvider
