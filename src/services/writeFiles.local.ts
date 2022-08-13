import { writeTextFile } from '@tauri-apps/api/fs'
import { type } from '@tauri-apps/api/os'
import { Note } from '../interfaces'

export default async function writeNoteLocal (folder:string = '', note: Note) {
  const { _id, file, fileName } = note
  const { title, content } = file

  const osType = await type()
  let path = ''
  const slash = osType === 'Windows_NT' ? '\\' : '/'
  const localPath = localStorage.getItem('path')
  if (localPath) {
    path = `${localPath}${slash}`
  } else {
    path = `notes${slash}`
  }

  if (folder) {
    path += `${folder}${slash}`
  }
  path += `${slash}${fileName}`

  const newContent = {
    _id,
    fileName,
    title,
    content
  }

  if (localPath) {
    await writeTextFile(path, JSON.stringify(newContent))
  }
}
