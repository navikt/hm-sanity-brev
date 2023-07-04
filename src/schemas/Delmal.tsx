import { defineArrayMember, defineField, defineType } from 'sanity'
import { HvorErDelmalenIBruk } from '../komponenter/HvorErDelmalenIBruk'
import { DokumentNavn } from '../typer'
import { apiNavnValideringer } from '../valideringer'
import { flettefelter } from './felter/flettefelter'

const inlineFlettefelt = defineArrayMember({
  name: DokumentNavn.FLETTEFELT,
  type: 'object',
  fields: [
    {
      name: DokumentNavn.FLETTEFELT,
      type: 'string',
      options: {
        list: [...flettefelter],
      },
      validation(rule) {
        return [rule.required().error('Tomt flettefelt')]
      },
    },
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
    title: tittel,
    name: maalform,
    type: 'array',
    of: [
      defineArrayMember({
        name: DokumentNavn.BLOCK,
        type: 'block',
        of: [inlineFlettefelt],
      }),
    ],
  })
}

export const Delmal = defineType({
  title: 'Delmal',
  name: DokumentNavn.DELMAL,
  type: 'document',
  fields: [
    defineField({
      title: 'Visningsnavn',
      name: DokumentNavn.VISNINGSNAVN,
      type: 'string',
      validation(rule) {
        return [rule.required().error('Delmalen må ha et navn')]
      },
    }),
    defineField({
      title: 'API-navn',
      name: DokumentNavn.API_NAVN,
      type: 'string',
      validation(rule) {
        return apiNavnValideringer(rule, DokumentNavn.DELMAL)
      },
    }),
    defineField({
      name: 'hvorDenBrukes',
      type: 'string',
      description: 'Dette er et dummyfelt for å få vist komponenten som viser hvor den delte teksten er i bruk.',
      components: {
        input: HvorErDelmalenIBruk,
      },
    }),
    defineField({
      title: 'Mappe',
      name: DokumentNavn.MAPPE,
      type: 'array',
      of: [{ type: 'string' }],
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
