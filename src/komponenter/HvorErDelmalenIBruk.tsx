import { useDocumentId } from '../utils/useDocumentId'
import { useDocumentUrl } from '../utils/useDocumentUrl'
import { useSanityQuery } from '../utils/useSanityQuery'
import { Feilmelding } from './Feilmelding'

export function HvorErDelmalenIBruk() {
  const documentId = useDocumentId()

  const query = `*[ references("${documentId}") ]`
  const { data, error } = useSanityQuery(query)

  if (error) {
    console.error(error)
    return <Feilmelding>Det skjedde en feil.</Feilmelding>
  }

  if (!data) {
    return <div>Sjekker om delmalen er i bruk...</div>
  }

  if (!data.length) {
    return <div>Denne delmalen er ikke i bruk.</div>
  }

  const documentUrl = useDocumentUrl()

  return (
    <div>
      <div>Denne delmalen er brukt {data.length} steder:</div>
      <ul>
        {data.map((ref: IReferrer) => {
          const stikkord = ref.stikkord ? ref.stikkord.join(';') + ';' : ''
          const erRefDraft = ref._id.includes('drafts')
          return (
            !erRefDraft && (
              <li key={ref._id}>
                <a href={`${documentUrl}/${ref._type};${stikkord}${ref._id}`}>{ref.visningsnavn}</a>
              </li>
            )
          )
        })}
      </ul>
    </div>
  )
}

interface IReferrer {
  _id: string
  _type: string
  visningsnavn: string
  stikkord?: string[]
}
