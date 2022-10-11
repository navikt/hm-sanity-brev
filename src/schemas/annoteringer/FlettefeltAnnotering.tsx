import styles from '../../styles/styles.css'
import React from 'react'
import { DokumentNavn, SanityTyper } from '../../util/typer'
import { NyttFelt } from '../../komponenter/NyttFelt'

export default (filter = undefined) => ({
  name: DokumentNavn.FLETTEFELT,
  type: SanityTyper.OBJECT,
  title: 'Flettefelt',
  blockEditor: {
    icon: () => <span className={styles.flettefeltIkon}>F</span>,
    render: props => (
      <span contentEditable={true} className={styles.flettefelt}>
        {props.children}
      </span>
    ),
  },
  fields: [
    {
      name: 'flettefeltReferanse',
      type: SanityTyper.REFERENCE,
      to: [{ type: DokumentNavn.FLETTEFELT }],
      validation: Rule => [Rule.required().error('Tomt flettefelt')],
      options: { filter: filter },
    },
    {
      name: 'lagNy',
      type: SanityTyper.STRING,
      description: 'En knapp for å lage nye flettefelt',
      inputComponent: props => NyttFelt(props, 'flettefelt'),
    },
  ],
})
