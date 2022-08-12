import { useQuery } from '@tanstack/react-query'
import iterateEntries from '../services/getFiles.local'

interface File {
  title: string
  content: string
}

export interface FileData {
  _id: string
  fileName: string
  file: File
}

export default function useNotes () {
  return useQuery(['files'], iterateEntries)
}
