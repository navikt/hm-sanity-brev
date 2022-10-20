import React from 'react'
import HvorErDelmalenIBruk from '../komponenter/HvorErDelmalenIBruk'
//import TekstStyles from '../util/TekstStyles'
import { DokumentNavn, SanityTyper } from '../util/typer'
import { apiNavnValideringer } from '../util/valideringer'
//import FlettefeltAnnotering from './annoteringer/FlettefeltAnnotering'
//import decorators from '../util/decorators'
//import { flettefeltAvsnitt } from './avsnitt/flettefeltAvsnitt'
import { flettefelter } from './felter/typer'
import styled from 'styled-components'

/*const editor = (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: SanityTyper.ARRAY,
  of: [
    flettefeltAvsnitt,
    {
      type: SanityTyper.BLOCK,
      marks: {
        annotations: [FlettefeltAnnotering('erListe == false || !defined(erListe)')],
        decorators,
      },
      styles: TekstStyles,
    },
  ],
})*/

const inlineFlettefelt = {
  name: DokumentNavn.FLETTEFELT,
  type: SanityTyper.OBJECT,
  fields: [
    {
      name: DokumentNavn.FLETTEFELT,
      type: SanityTyper.STRING,
      options: {
        list: [...flettefelter],
      },
      validation: Rule => [Rule.required().error('Tomt flettefelt')],
    },
  ],
  preview: {
    select: {
      flettefelt: DokumentNavn.FLETTEFELT,
    },
    prepare: selection => selection,
    component: props => {
      const flettefelt = flettefelter.find(
        flettefelt => flettefelt.value === props.value.flettefelt,
      )
      return <Flettefelt>{flettefelt?.title ?? 'Tomt flettefelt'}</Flettefelt>
    },
  },
}

const editor = (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: SanityTyper.ARRAY,
  of: [
    {
      name: DokumentNavn.BLOCK,
      type: SanityTyper.BLOCK,
      of: [inlineFlettefelt],
    },
  ],
})

export default {
  title: 'Delmal',
  name: DokumentNavn.DELMAL,
  type: SanityTyper.DOCUMENT,
  preview: {
    select: {
      title: DokumentNavn.VISNINGSNAVN,
    },
  },
  fields: [
    {
      title: 'Visningsnavn',
      type: SanityTyper.STRING,
      name: DokumentNavn.VISNINGSNAVN,
      validation: Rule => [Rule.required().error('Delmalen må ha et navn')],
    },
    {
      title: 'Api-navn',
      type: SanityTyper.STRING,
      name: DokumentNavn.API_NAVN,
      validation: Rule => apiNavnValideringer(Rule, DokumentNavn.DELMAL),
    },
    {
      name: 'hvorDenBrukes',
      type: SanityTyper.STRING,
      description:
        'Dette er et dummyfelt for å få vist komponenten som viser hvor den delte teksten er i bruk.',
      inputComponent: HvorErDelmalenIBruk,
    },
    {
      title: 'Mappe',
      name: DokumentNavn.MAPPE,
      type: SanityTyper.ARRAY,
      of: [{ type: 'string' }],
    },
    editor(DokumentNavn.BOKMAAL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
}

const Flettefelt = styled.span`
  background-color: rgba(30, 133, 209, 0.2);
  text-overflow: ellipsis;
  line-height: normal;
  white-space: nowrap;
  max-inline-size: 160px;
  overflow: hidden;
  display: inline-block;
`
