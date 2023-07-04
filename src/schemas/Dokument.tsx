import { defineArrayMember, defineField, defineType } from 'sanity'
import { DokumentNavn } from '../typer'
import { apiNavnValideringer } from '../valideringer'
import { begrunnelseAvsnitt } from './avsnitt/begrunnelseAvsnitt'
import { delmalAvsnitt } from './avsnitt/delmalAvsnitt'
import { flettefelter } from './felter/flettefelter'

const inlineFlettefelt = defineArrayMember({
  name: DokumentNavn.FLETTEFELT,
  type: 'object',
  fields: [
    defineField({
      name: DokumentNavn.FLETTEFELT,
      type: 'string',
      options: {
        list: [...flettefelter],
      },
      validation(rule) {
        return [rule.required().error('Tomt flettefelt')]
      },
    }),
  ],
  preview: {
    select: {
      flettefelt: DokumentNavn.FLETTEFELT,
    },
    prepare(value) {
      const listValue = flettefelter.find(flettefelt => flettefelt.value === value.flettefelt)
      return {
        title: listValue?.title,
      }
    },
  },
})

function editor(maalform: string, tittel: string) {
  return defineField({
    name: maalform,
    title: tittel,
    type: 'array',
    of: [
      delmalAvsnitt(maalform),
      begrunnelseAvsnitt,
      defineArrayMember({
        name: DokumentNavn.BLOCK,
        type: 'block',
        of: [inlineFlettefelt],
      }),
    ],
  })
}

export const Dokument = defineType({
  title: 'Dokument',
  name: DokumentNavn.DOKUMENT,
  type: 'document',
  fields: [
    defineField({
      title: 'Visningsnavn',
      name: DokumentNavn.VISNINGSNAVN,
      type: 'string',
      validation(rule) {
        return [rule.required().error('Dokumentet må ha et navn')]
      },
    }),
    defineField({
      title: 'API-navn',
      name: DokumentNavn.API_NAVN,
      type: 'string',
      description: 'Teknisk navn, for eksempel vedtaksbrev',
      validation(rule) {
        return apiNavnValideringer(rule, DokumentNavn.DOKUMENT)
      },
    }),
    defineField({
      title: 'Tittel bokmål',
      name: DokumentNavn.TITTEL_BOKMAAL,
      type: 'string',
    }),
    defineField({
      title: 'Tittel nynorsk',
      name: DokumentNavn.TITTEL_NYNORSK,
      type: 'string',
    }),
    editor(DokumentNavn.BOKMÅL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
  preview: {
    select: {
      title: DokumentNavn.VISNINGSNAVN,
    },
  },
})
