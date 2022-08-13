import { writeTextFile } from '@tauri-apps/api/fs'
// Write a text file to the `$APPDIR/app.conf` path

export default async function exportFileToMarkdown (path: string, data:string) {
  await writeTextFile(path, data)
}
