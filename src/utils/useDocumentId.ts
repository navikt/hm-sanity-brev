export function useDocumentId(): string {
  const url = window.location.pathname
  return url.includes(';') ? url.split(';').reverse()[0].slice(0, 36) : url.split('__edit__').reverse()[0].slice(0, 36)
}
