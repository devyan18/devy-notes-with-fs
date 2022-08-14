import { writeTextFile, createDir, BaseDirectory, readTextFile } from '@tauri-apps/api/fs'
import getSlash from '../utils/getSlash'

interface ContentFile {
  _id: string
  fileName: string
  title: string
  content: string
}

interface FileLocal {
  localPath: string
  name: string
  content: ContentFile,
  folder?: string
}

export async function createDirLocal (path:string, name: string) {
  const slash = await getSlash()

  if (path) {
    await createDir(`${path}${slash}${name}`)
  } else {
    await createDir(`notes${slash}${name}`, { dir: BaseDirectory.Document, recursive: true })
  }

  return name
}

export async function createFileLocal ({ localPath, name, content, folder = '' }: FileLocal) {
  let path = ''
  const slash = await getSlash()

  if (folder !== '') {
    path = `${localPath}${slash}${folder}${slash}${name}.json`
  } else {
    path = `${localPath}${slash}${name}.json`
  }

  let data: string = ''
  await writeTextFile(path, JSON.stringify(content))
  data = await readTextFile(path)

  return data
}
