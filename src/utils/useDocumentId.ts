import { useLocation } from './useLocation'

export function useDocumentId(): string {
  const { pathname } = useLocation()
  return pathname.includes(';')
    ? pathname.split(';').reverse()[0].slice(0, 36)
    : pathname.split('__edit__').reverse()[0].slice(0, 36)
}
