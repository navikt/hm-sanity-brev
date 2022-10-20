import { useEffect, useState } from 'react'
import sanityClient from '@sanity/client'

export const client = (datasett, brukCache) => {
  return sanityClient({
    projectId: 'ypyqai5p',
    dataset: datasett,
    useCdn: brukCache,
    withCredentials: true,
    apiVersion: '2021-06-07'
  })    
}

export async function hentFraSanity(query, brukCache = true, brukSessionStorage = true) {
  const datasett = window.location.pathname.split('/')[1]
  const key = datasett + ';' + query;
  const cachedHits = sessionStorage.getItem(key)

  if (cachedHits && brukSessionStorage) {
    return JSON.parse(cachedHits)
  } else {
    const response = await client(datasett, brukCache).fetch(query)
    sessionStorage.setItem(key, JSON.stringify(response))
    return response
  }
}

export function useSanityQuery(query, brukCache = true, brukSessionStorage = true) {
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(undefined)

  useEffect(() => {
    hentFraSanity(query, brukCache, brukSessionStorage)
      .then(response => setData(response))
      .catch(error => setError(error))
  }, [query, brukCache, brukSessionStorage])

  return { data, error }
}
