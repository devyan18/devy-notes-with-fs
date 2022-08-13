import { writeTextFile, createDir, BaseDirectory, readTextFile } from '@tauri-apps/api/fs'
import { type } from '@tauri-apps/api/os'

// Create the `$APPDIR/users` directory
// Write a text file to the `$APPDIR/app.conf` path

export async function createDirLocal (name: string) {
  const osType = await type()

  const slash = osType === 'Windows_NT' ? '\\' : '/'

  const localPath = localStorage.getItem('path')

  if (localPath) {
    await createDir(`${localPath}${slash}${name}`)
  } else {
    await createDir(`notes${slash}${name}`, { dir: BaseDirectory.Document, recursive: true })
  }

  return name
}

interface ContentFile {
  _id: string
  fileName: string
  title: string
  content: string
}

interface FileLocal {
  name: string
  content: ContentFile,
  folder?: string
}

export async function createFileLocal ({ name, content, folder = '' }: FileLocal) {
  const osType = await type()
  let path = ''

  const slash = osType === 'Windows_NT' ? '\\' : '/'

  const localPath = localStorage.getItem('path')

  if (folder !== '') {
    if (localPath) {
      path = `${localPath}${slash}${folder}${slash}${name}.json`
    } else {
      path = `notes${slash}${folder}${slash}${name}.json`
    }
  } else {
    if (localPath) {
      path = `${localPath}${slash}${name}.json`
    } else {
      path = `notes${slash}${name}.json`
    }
  }

  let data: string = ''
  if (localPath) {
    await writeTextFile(path, JSON.stringify(content))
    data = await readTextFile(path)
  } else {
    await writeTextFile(path, JSON.stringify(content), { dir: BaseDirectory.Document })
    data = await readTextFile(path, { dir: BaseDirectory.Document })
  }
  return data
}
