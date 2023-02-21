import React from 'react'
import styled from 'styled-components'
import { DokumentNavn, SanityTyper } from '../util/typer'
import { apiNavnValideringer } from '../util/valideringer'
import { delmalAvsnitt } from './avsnitt/delmalAvsnitt'
//import { peroideAvsnitt } from './avsnitt/periodeAvsnitt'
import { begrunnelseAvsnitt } from './avsnitt/begrunnelseAvsnitt'
//import { periodeFlettefeltAvsnitt } from './periode'
import { flettefelter } from './felter/typer'

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
    begrunnelseAvsnitt,
    //periodeFlettefeltAvsnitt,
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
    { type: SanityTyper.STRING, title: 'Tittel bokmål', name: DokumentNavn.TITTEL_BOKMAAL },
    { type: SanityTyper.STRING, title: 'Tittel nynorsk', name: DokumentNavn.TITTEL_NYNORSK },
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
