import { defineArrayMember, defineField, defineType } from 'sanity'
import { DokumentNavn } from '../typer'
import { apiNavnValideringer } from '../utils/valideringer'
import { betingelser } from './annotasjoner/betingelser'
import { betingetVisning } from './annotasjoner/betingetVisning'
import { begrunnelseAvsnitt } from './avsnitt/begrunnelseAvsnitt'
import { delmalAvsnitt } from './avsnitt/delmalAvsnitt'
import { findListValueTitle } from './felter/findListValueTitle'
import { flettefelter } from './felter/flettefelter'

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
})

function editor(maalform: string, tittel: string) {
  return defineField({
    name: maalform,
    title: tittel,
    type: 'array',
    of: [
      delmalAvsnitt(maalform),
      begrunnelseAvsnitt(),
      defineArrayMember({
        name: DokumentNavn.BLOCK,
        type: 'block',
        marks: {
          annotations: [betingetVisning(betingelser)],
        },
        of: [inlineFlettefelt(), inlineBetingetTekst()],
      }),
    ],
  })
}

function inlineFlettefelt() {
  return defineArrayMember({
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
        return {
          title: findListValueTitle(flettefelter, value.flettefelt),
        }
      },
    },
  })
}

function inlineBetingetTekst() {
  return defineArrayMember({
    title: 'Betinget tekst',
    name: 'betingetTekst',
    type: 'object',
    fields: [
      defineField({
        name: 'betingelse',
        type: 'string',
        options: {
          list: [...betingelser],
        },
        validation(rule) {
          return [rule.required().error('Tom betingelse')]
        },
      }),
      defineField({
        name: 'tekst',
        type: 'array',
        of: [{ name: 'block', type: 'block', of: [inlineFlettefelt()] }],
      }),
    ],
    preview: {
      select: {
        title: 'tekst',
      },
    },
  })
}
