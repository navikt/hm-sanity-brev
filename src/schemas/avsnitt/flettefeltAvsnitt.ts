import FlettefeltBlockComponent from '../../komponenter/FlettefeltBlockComponent'
import { NyttFelt } from '../../komponenter/NyttFelt'
import { DokumentNavn, SanityTyper } from '../../util/typer'

export const flettefeltAvsnitt = {
  name: DokumentNavn.FLETTEFELT,
  type: SanityTyper.OBJECT,
  title: 'Flettefelt',
  fields: [
    {
      name: DokumentNavn.FLETTEFELT_REFERANSE,
      type: SanityTyper.REFERENCE,
      to: [{ type: 'flettefelt' }],
      validation: Rule => [Rule.required().error('Tomt flettefelt')],
      options: { filter: 'erListe == true' },
    },
    {
      name: 'lagNy',
      type: SanityTyper.STRING,
      desription: 'En knapp for å lage nye flettefelt',
      inputComponent: props => NyttFelt(props, DokumentNavn.FLETTEFELT),
    },
  ],
  preview: {
    select: {
      _ref: `${DokumentNavn.FLETTEFELT_REFERANSE}._ref`,
    },
    prepare: selection => selection,
    component: props => {
      return FlettefeltBlockComponent(props.value._ref)
    },
  },
}
