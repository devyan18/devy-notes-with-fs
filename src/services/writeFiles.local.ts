import { writeTextFile } from '@tauri-apps/api/fs'
import { Note } from '../interfaces'
import getSlash from '../utils/getSlash'

export default async function writeNoteLocal (localPath: string, folder:string = '', note: Note) {
  const { _id, file, fileName } = note
  const { title, content } = file

  let path = ''

  const slash = await getSlash()

  path = `${localPath}${slash}`

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
