import { readDir, BaseDirectory, FileEntry, readTextFile } from '@tauri-apps/api/fs'
import { useEffect, useState } from 'react'

interface File {
  title: string
  content: string
}

interface FileData {
  _id: string
  fileName: string
  file: File
}

export default function useNotes () {
  const [notes, setNotes] = useState<Array<FileData>>([])

  const iterateEntries = async () => {
    const entries = await readDir('notes', { dir: BaseDirectory.Document, recursive: true })

    const data:Array<string> = []
    function processEntries (entries: FileEntry[]) {
      for (const entry of entries) {
        if (entry.name) {
          data.push(entry.name)
        }

        if (entry.children) {
          processEntries(entry.children)
        }
      }
    }

    processEntries(entries)

    const mappedNotes:Array<FileData> = []

    for (const note of data) {
      console.log(note)
      const text = await readTextFile(`notes/${note}`, { dir: BaseDirectory.Document })
      const { _id, title, content } = JSON.parse(text)

      mappedNotes.push({ _id, fileName: note, file: { title, content } })
    }
    return mappedNotes
  }

  useEffect(() => {
    iterateEntries()
      .then(data => {
        setNotes(data)
      })
  }, [])

  return notes
}
