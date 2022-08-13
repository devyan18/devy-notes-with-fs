import { removeFile, BaseDirectory } from '@tauri-apps/api/fs'
import { type } from '@tauri-apps/api/os'
// Remove the `$APPDIR/app.conf` file
// await removeFile('app.conf', { dir: BaseDirectory.App });

export default async function deleteLocalNote (folder:string = '', name: string) {
  const pathLocal = localStorage.getItem('path')

  const osType = await type()
  let path = ''
  const slash = osType === 'Windows_NT' ? '\\' : '/'

  if (pathLocal) {
    path = `${pathLocal}${slash}`
  } else {
    path = `notes${slash}`
  }

  if (folder) {
    path += `${folder}${slash}`
  }

  path += `${slash}${name}`

  if (pathLocal) {
    await removeFile(path)
  } else {
    await removeFile(path, { dir: BaseDirectory.Document })
  }
}
