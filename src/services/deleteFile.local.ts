import { removeFile } from '@tauri-apps/api/fs'
import getSlash from '../utils/getSlash'

export default async function deleteLocalNote (pathLocal:string, folder:string = '', name: string) {
  const slash = await getSlash()

  let path = ''

  path = `${pathLocal}${slash}`

  if (folder) {
    path += `${folder}${slash}`
  }

  path += `${slash}${name}`

  await removeFile(path)
}
