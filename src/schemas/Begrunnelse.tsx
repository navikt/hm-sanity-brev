import { defineArrayMember, defineField, defineType } from 'sanity'
import { BegrunnelseDokumentNavn, Begrunnelsestype, begrunnelsestyperTilMenynavn, DokumentNavn } from '../typer'
import { apiNavnValideringerBegrunnelse } from '../valideringer'
import { avslagFlettefelter, hjemler } from './felter/flettefelter'

const begrunnelseFlettefelt = defineArrayMember({
  title: 'Begrunnelse',
  name: DokumentNavn.FLETTEFELT,
  type: 'object',
  fields: [
    defineField({
      name: DokumentNavn.FLETTEFELT,
      type: 'string',
      options: {
        list: [...avslagFlettefelter],
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
      const listValue = avslagFlettefelter.find(flettefelt => flettefelt.value === value.flettefelt)
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
        of: [begrunnelseFlettefelt],
      }),
    ],
  })
}

export const Begrunnelse = defineType({
  title: 'Begrunnelse',
  name: BegrunnelseDokumentNavn.BEGRUNNELSE,
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
      title: 'Begrunnelsetype',
      name: BegrunnelseDokumentNavn.BEGRUNNELSE_TYPE,
      type: 'string',
      options: {
        list: Object.values(Begrunnelsestype).map(begrunnelsestype => begrunnelsestyperTilMenynavn[begrunnelsestype]),
      },
      validation(rule) {
        return rule.required().error('Begrunnelsestype ikke valgt')
      },
    }),
    defineField({
      title: 'API-navn',
      name: DokumentNavn.API_NAVN,
      type: 'string',
      description: 'Teknisk navn. For eksempel innvilgetInnhenteOpplysninger',
      validation(rule) {
        return apiNavnValideringerBegrunnelse(rule, BegrunnelseDokumentNavn.BEGRUNNELSE)
      },
    }),
    defineField({
      title: 'Hjemler',
      name: BegrunnelseDokumentNavn.HJEMLER,
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'grid',
        list: hjemler.map(hjemmel => ({ value: hjemmel, title: `§${hjemmel}` })),
      },
    }),
    editor(DokumentNavn.BOKMÅL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
  preview: {
    select: {
      title: DokumentNavn.VISNINGSNAVN,
    },
  },
  validation: rule =>
    rule.custom((value, context: any): true | string => {
      const feil: any[] = []

      context.type.fields.forEach((field: any) => {
        const erHidden = field?.type?.hidden ? field.type.hidden(context) : false
        if (erHidden && context.document[field.name] !== undefined) {
          feil.push(
            `${field.type.title} er skjult, men har verdiene ${context.document[field.name].join(
              ', ',
            )} satt. Fjern disse før du publiserer eller ta kontakt med en utvikler.`,
          )
        }
      })

      if (feil.length !== 0) {
        return feil.join('\n')
      } else {
        return true
      }
    }),
})
