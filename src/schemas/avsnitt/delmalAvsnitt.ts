import { defineArrayMember, defineField } from 'sanity'
import { DelmalPreview } from '../../komponenter/DelmalPreview'
import { DokumentNavn } from '../../typer'

export const delmalAvsnitt = (maalform: string) =>
  defineArrayMember({
    title: 'Delmal',
    name: DokumentNavn.DELMAL,
    type: 'object',
    fields: [
      defineField({
        title: 'Referanse til delmal:',
        name: DokumentNavn.DELMAL_REFERANSE,
        type: 'reference',
        to: [{ type: DokumentNavn.DELMAL }],
        validation(rule) {
          return [rule.required().error('Fyll inn en enkel delmal')]
        },
      }),
    ],
    validation(rule) {
      return [rule.required().error('Ingen delmal valgt')]
    },
    preview: {
      select: {
        id: `${DokumentNavn.DELMAL_REFERANSE}._ref`,
        title: 'title',
      },
      prepare(value) {
        const { id, title } = value
        return {
          id,
          title,
          maalform,
        }
      },
    },
    components: {
      preview: DelmalPreview as any, // fixme props fra prepare blir ikke utledet riktig
    },
  })
