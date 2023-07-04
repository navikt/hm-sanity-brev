import { UlistIcon } from '@sanity/icons'
import { defineArrayMember, defineField } from 'sanity'
import { BegrunnelseBeskrivelse } from '../../komponenter/Begrunnelsebeskrivelse'
import { DokumentNavn } from '../../typer'

export const begrunnelseAvsnitt = defineArrayMember({
  title: 'Begrunnelser',
  name: DokumentNavn.BEGRUNNELSER,
  type: 'object',
  fields: [
    defineField({
      title: 'Beskrivelse',
      name: 'begrunnelseBeskrivelse',
      type: 'string',
      components: {
        input: BegrunnelseBeskrivelse,
      },
    }),
  ],
  preview: {
    select: {
      title: '_type',
    },
    prepare(value) {
      const { title } = value
      return {
        title: title.charAt(0).toUpperCase() + title.slice(1),
        media: UlistIcon,
      }
    },
  },
})
