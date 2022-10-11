import React from 'react'
import { useSanityQuery } from '../util/sanity'
import { ErrorStyling, Header } from './Elementer'

export default function HvorErDelmalenIBruk(props: any) {
  const url = window.location.pathname

  console.log(`Hvor er delmalen i bruk URL ${url}`)

  const documentId = url.includes(';')
    ? url.split(';').reverse()[0].slice(0, 36)
    : url.split('__edit__').reverse()[0].slice(0, 36)

  const query = `*[references("${documentId}")]`
  const { data, error } = useSanityQuery(query)

  if (error) {
    console.error(error)
    return <ErrorStyling>Det skjedde en feil.</ErrorStyling>
  }

  if (!data) {
    return <div>Sjekker om delmalen er i bruk..</div>
  }

  if (!data.length) {
    return (
      <Header {...props}>
        Denne delmalen er ikke i bruk{' '}
        <span role="img" aria-label="Gråte-emoji">
          😢
        </span>
      </Header>
    )
  }

  const referenceBaseUrl = window.location.pathname.split('/').slice(0, -1).join('/')

  return (
    <div {...props}>
      <div>Denne delmalen er brukt {data.length} steder:</div>
      <ul>
        {data.map((ref: IReferrer) => {
          const stikkord = ref.stikkord ? ref.stikkord.join(';') + ';' : ''
          const erRefDraft = ref._id.includes('drafts')

          return (
            !erRefDraft && (
              <li key={ref._id}>
                <a href={`${referenceBaseUrl}/${ref._type};${stikkord}${ref._id}`}>
                  {ref.visningsnavn}
                </a>
              </li>
            )
          )
        })}
      </ul>
    </div>
  )
}

type IReferrer = {
  stikkord?: string[]
  visningsnavn: string
  _id: string
  _type: string
}
