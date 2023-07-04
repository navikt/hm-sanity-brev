import { DokumentNavn } from '../typer'

export function BegrunnelseBeskrivelse() {
  const referenceBaseUrl = window.location.pathname.split('/').slice(0, -1).join('/')
  return (
    <div>
      Systemet som tar i bruk denne malen vil fylle dette feltet med begrunnelser som er relevante. Begrunnelsene blir
      hentet fra Sanity og er definert <a href={`${referenceBaseUrl}/${DokumentNavn.BEGRUNNELSE}`}>her.</a>
    </div>
  )
}
