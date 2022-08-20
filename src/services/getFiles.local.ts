import { readDir, FileEntry, readTextFile } from '@tauri-apps/api/fs'
import getSlash from '../utils/getSlash'

interface File {
  title: string
  content: string
}

export interface FileData {
  _id: string
  fileName: string
  file: File
}

interface FolderWithoutDataFiles {
  fileName: string,
  files: Array<String>
}

interface Folder {
  _id?: string
  fileName: string,
  files: Array<FileData> | null
}

const getLocalFiles = async () => {
  const customPath = localStorage.getItem('custom-path')
  let localPath = ''
  if (customPath) {
    localPath = customPath
  } else {
    localPath = localStorage.getItem('default-path') || ''
  }

  const slash = await getSlash()

  let entries: FileEntry[] = []

  entries = await readDir(localPath, { recursive: true })

  const data:Array<string> = []
  const dataWidthFolder: Array<FolderWithoutDataFiles> = []

  function processEntries (entries: FileEntry[]) {
    for (const entry of entries) {
      if (!entry.children && entry.name) {
        data.push(entry.name)
      } else if (entry.children?.length === 0 && entry.name) {
        dataWidthFolder.push({
          fileName: entry.name,
          files: []
        })
        processEntries(entry.children)
      } else {
        if (entry.children) {
          for (const fileEntry of entry.children) {
            if (entry.name && fileEntry.name) {
              dataWidthFolder.push({
                fileName: entry.name,
                files: [fileEntry.name]
              })
            }
          }
        }
      }
    }
  }

  processEntries(entries)

  const mappedNotes:Array<FileData> = []
  const mappedFolders: Array<Folder> = []

  for (const note of data) {
    if (note.includes('.json')) {
      let text:string = ''
      text = await readTextFile(`${localPath}${slash}${note}`)

      const { _id, title, content } = JSON.parse(text)
      mappedNotes.push({ _id, fileName: note, file: { title, content } })
    }
  }

  for (const folders of dataWidthFolder) {
    const newFolder:Folder = {
      _id: folders.fileName,
      fileName: folders.fileName,
      files: []
    }
    const filesByFolder: Array<FileData> = []
    for (const file of folders.files) {
      let text:string = ''
      text = await readTextFile(`${localPath}${slash}${folders.fileName}${slash}${file}`)
      const { _id, title, content } = JSON.parse(text)
      filesByFolder.push({
        _id,
        fileName: file.toString(),
        file: { title, content }
      })
    }
    newFolder.fileName = folders.fileName
    newFolder.files = filesByFolder

    if (!mappedFolders.find(folder => folder.fileName === newFolder.fileName)) {
      mappedFolders.push(newFolder)
    } else {
      mappedFolders.map(folder => {
        if (folder.fileName === newFolder.fileName) {
          folder.files?.push(...filesByFolder)
        }
        return folder
      })
    }
  }

  return { mappedNotes, mappedFolders }
}

export default getLocalFiles
