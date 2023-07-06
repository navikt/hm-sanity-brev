import { defineArrayMember, defineField } from 'sanity'
import { DocumentLink } from '../../komponenter/DocumentLink'
import { DokumentNavn } from '../../typer'

export function begrunnelseAvsnitt() {
  return defineArrayMember({
    title: 'Begrunnelser',
    name: DokumentNavn.BEGRUNNELSER,
    type: 'object',
    fields: [
      defineField({
        title: 'Beskrivelse',
        name: 'begrunnelseBeskrivelse',
        type: 'string',
        components: {
          input() {
            return (
              <>
                Systemet som tar i bruk denne malen vil fylle dette feltet med begrunnelser som er relevante.
                Begrunnelsene blir hentet fra Sanity og er definert{' '}
                <DocumentLink name={DokumentNavn.BEGRUNNELSE}>her.</DocumentLink>
              </>
            )
          },
        },
      }),
    ],
  })
}
