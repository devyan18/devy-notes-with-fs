import { type } from '@tauri-apps/api/os'

export default async function getSlash () {
  const osType = await type()
  const slash = osType === 'Windows_NT' ? '\\' : '/'
  return slash
}
