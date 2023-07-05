import { useEffect, useState } from 'react'
import { useClient } from 'sanity'

export function useSanityQuery<T = any, E = unknown>(query: string) {
  const client = useClient({
    apiVersion: '2021-06-07',
  })

  const [data, setData] = useState<T>()
  const [error, setError] = useState<E>()

  useEffect(() => {
    client
      .fetch<T>(query)
      .then(response => setData(response))
      .catch(error => setError(error))
  }, [client, query])

  return { data, error }
}
