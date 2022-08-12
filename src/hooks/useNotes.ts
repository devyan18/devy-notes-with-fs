import { readDir, BaseDirectory, FileEntry, readTextFile } from '@tauri-apps/api/fs'
import { useEffect, useState } from 'react'

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

const iterateEntries = async () => {
  const entries = await readDir('notes', { dir: BaseDirectory.Document, recursive: true })

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
      const text = await readTextFile(`notes/${note}`, { dir: BaseDirectory.Document })
      const { _id, title, content } = JSON.parse(text)
      mappedNotes.push({ _id, fileName: note, file: { title, content } })
    }
  }

  for (const folders of dataWidthFolder) {
    console.log(folders)
    const newFolder:Folder = {
      _id: folders.fileName,
      fileName: folders.fileName,
      files: []
    }
    const filesByFolder: Array<FileData> = []
    for (const file of folders.files) {
      const text = await readTextFile(`notes/${folders.fileName}/${file}`, { dir: BaseDirectory.Document })
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

export default function useNotes () {
  const [notes, setNotes] = useState<Array<FileData>>([])
  const [folders, setFolders] = useState<Array<Folder>>([])
  const [loading, setLoading] = useState<boolean>(false)

  const syncNotes = async () => {
    setLoading(true)
    const { mappedNotes, mappedFolders } = await iterateEntries()
    setNotes(mappedNotes)
    setFolders(mappedFolders)
    setLoading(false)
    return 'owo'
  }

  const setNewFilWithInFolder = (folderName:string, file: FileData) => {
    setFolders(folders.map(folder => {
      if (folder.fileName === folderName) {
        folder.files?.push(file)
      }
      return folder
    }))
  }

  useEffect(() => {
    setLoading(true)
    iterateEntries()
      .then(({ mappedNotes, mappedFolders }) => {
        setNotes(mappedNotes)
        setFolders(mappedFolders)
        setLoading(false)
      })
  }, [])

  return { loading, notes, folders, setNewFilWithInFolder, syncNotes }
}
