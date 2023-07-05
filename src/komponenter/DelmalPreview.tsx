import { PortableText } from '@portabletext/react'
import { Badge } from '@sanity/ui'
import { useSanityQuery } from '../utils/useSanityQuery'
import { Feilmelding } from './Feilmelding'

export interface DelmalPreviewProps {
  id: string
  title: string
  maalform: string
}

export function DelmalPreview(props: DelmalPreviewProps) {
  const { id, maalform } = props
  const query = `*[ _id == "${id}" ]{..., ${maalform}[]}`
  const { data, error } = useSanityQuery(query)

  if (!id) {
    return <Feilmelding>Fyll ut delmal</Feilmelding>
  }

  if (error) {
    console.error(error)
    return <Feilmelding>Det skjedde en feil.</Feilmelding>
  }

  if (!data) {
    return <div>Laster delmal...</div>
  }

  if (!data.length) {
    return <Feilmelding>Delmalen finnes ikke.</Feilmelding>
  }

  const value = data[0][maalform]

  if (!value) {
    return <div>Delmalen har ingen tekst for denne målformen.</div>
  }

  return (
    <div>
      <Badge tone="primary">Delmal: {data[0].visningsnavn}</Badge>
      <PortableText value={value} />
    </div>
  )
}
