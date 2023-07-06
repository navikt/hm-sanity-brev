import { useDocumentUrl } from '../utils/useDocumentUrl'

export function DocumentLink({ name, children }: { name: string; children: string }) {
  const url = useDocumentUrl(name)
  return <a href={url}>{children}</a>
}
