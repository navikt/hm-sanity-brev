import DelmalBlockComponent from '../../komponenter/DelmalBlockCompoent'
import { NyttFelt } from '../../komponenter/NyttFelt'
import { DokumentNavn, SanityTyper } from '../../util/typer'

export const delmalAvsnitt = maalform => ({
  title: 'Delmal',
  name: DokumentNavn.DELMAL,
  type: SanityTyper.OBJECT,
  fields: [
    {
      title: 'Referanse til delmal:',
      name: DokumentNavn.DELMAL_REFERANSE,
      type: SanityTyper.REFERENCE,
      to: [{ type: DokumentNavn.DELMAL }],
      validation: Rule => [Rule.required().error('Fyll inn en enkel delmal')],
    },
    {
      title: 'Delmalen skal alltid med',
      name: DokumentNavn.SKAL_ALLTID_MED,
      type: SanityTyper.BOOLEAN,
      description: 'Denne denne er på kan systemet alltid validere at denne alltid er med',
      validation: Rule => [Rule.required().error('Velg om delmalen alltid skal med')],
    },
    {
      name: 'lagNy',
      type: SanityTyper.STRING,
      description: 'En knapp for å lage delmal',
      inputComponent: props => NyttFelt(props, DokumentNavn.DELMAL),
    },
  ],
  validation: Rule => [Rule.required().error('Ingen delmal valgt')],
  preview: {
    select: {
      _id: `${DokumentNavn.DELMAL_REFERANSE}._ref`,
    },
    prepare: selection => selection,
    component: props => {
      return DelmalBlockComponent(props, maalform, props.value._id)
    },
  },
})
