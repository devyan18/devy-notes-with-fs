import { writeTextFile, createDir, BaseDirectory, readTextFile } from '@tauri-apps/api/fs'
// Create the `$APPDIR/users` directory
// Write a text file to the `$APPDIR/app.conf` path

export async function createDirLocal (name: string) {
  await createDir(`notes/${name}`, { dir: BaseDirectory.Document, recursive: true })
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
  let path = ''

  if (folder !== '') {
    path = `notes/${folder}/${name}`
  } else {
    path = `notes/${name}`
  }
  await writeTextFile(path, JSON.stringify(content), { dir: BaseDirectory.Document })
  const data = await readTextFile(path, { dir: BaseDirectory.Document })
  return data
}
