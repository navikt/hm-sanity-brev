import { useLocation } from './useLocation'

export function useDocumentUrl(name?: string): string {
  const { pathname } = useLocation()
  const baseUrl = pathname.split('/').slice(0, -1).join('/')
  return name ? `${baseUrl}/${name}` : baseUrl
}
