import React from 'react'
import { DokumentNavn, SanityTyper } from '../util/typer'
import { flettefelter } from './felter/typer'
import decorators from '../util/decorators'
import FlettefeltAnnotering from './annoteringer/FlettefeltAnnotering'
import { delmalAvsnitt } from './avsnitt/delmalAvsnitt'
import { flettefeltAvsnitt } from './avsnitt/flettefeltAvsnitt'
import TekstStyles from '../util/TekstStyles'
import { apiNavnValideringer } from '../util/valideringer'
import styled from 'styled-components'

/*const editor = (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: SanityTyper.ARRAY,
  of: [
    delmalAvsnitt(maalform),
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
    delmalAvsnitt(maalform),
    {
      name: DokumentNavn.BLOCK,
      type: SanityTyper.BLOCK,
      of: [inlineFlettefelt],
    },
  ],
})

export default {
  title: 'Dokument',
  name: DokumentNavn.DOKUMENT,
  type: SanityTyper.DOCUMENT,
  fields: [
    {
      title: 'Visningsnavn',
      type: SanityTyper.STRING,
      name: DokumentNavn.VISNINGSNAVN,
      validation: Rule => [Rule.required().error('Dokumentet må ha et navn')],
    },
    {
      title: 'Api navn',
      type: SanityTyper.STRING,
      name: DokumentNavn.API_NAVN,
      description: 'Teknisk navn. For eksempel vedtaksbrev',
      validation: Rule => apiNavnValideringer(Rule, DokumentNavn.DOKUMENT),
    },
    { title: 'Tittel', type: SanityTyper.LOCALE_STRING, name: DokumentNavn.TITTEL },
    editor(DokumentNavn.BOKMAAL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
  preview: {
    select: {
      title: DokumentNavn.VISNINGSNAVN,
    },
  },
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
