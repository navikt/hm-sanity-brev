import { string } from 'prop-types'
import React from 'react'
import { useSanityQuery } from '../util/sanity'
import { ErrorStyling, Header } from './Elementer'

function HvorErFlettefeltetIBruk(props: any) {
  const url = window.location.pathname
  const documentId = url.includes(';')
    ? url.split(';').reverse()[0].slice(0, 36)
    : url.split('__edit__').reverse()[0].slice(0, 36)

  console.log(`DocumentID fra hvorErFlettefelt i bruk URL: ${url} ID: ${documentId}`)

  const query = `*[references("${documentId}")]`
  const { data, error } = useSanityQuery(query)

  if (error) {
    console.error(error)
    return <ErrorStyling>Det skjedde en feil</ErrorStyling>
  }

  if (!data) {
    return <div>Sjekker om flettefeltet er i bruk...</div>
  }

  if (!data.length) {
    return <Header {...props}>Dette flettefeltet er ikke i bruk</Header>
  }

  const referenceBaseUrl = window.location.pathname.split('/').slice(0, -1).join('/')
  const unike = data.filter(ref => !ref._id.includes('drafts'))

  return (
    <div {...props}>
      <div>Dette flettefeltet er i bruk {unike.lenght} steder:</div>
      <ul>
        {unike.map((ref: IReferrer) => {
          const stikkord = ref.stikkord ? ref.stikkord.join(';') + ';' : ''

          return (
            <li key={ref._id}>
              <a href={`${referenceBaseUrl}/${ref._type};${stikkord}${ref._id}`}>
                {ref.visningsnavn}
              </a>
            </li>
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

export default HvorErFlettefeltetIBruk
