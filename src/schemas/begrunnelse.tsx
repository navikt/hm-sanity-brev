import * as React from 'react'
import styled from 'styled-components'
import {
  BegrunnelseDokumentNavn,
  Begrunnelsestype,
  begrunnelsestyperTilMenynavn,
  DokumentNavn,
  SanityTyper,
} from '../util/typer'
import { avslagFlettefelter, hjemler } from './felter/typer'
import { validerBegrunnelse } from './validerBegrunnelse'
import { apiNavnValideringerBegrunnelse } from '../util/valideringer'

const begrunnelseFlettefelt = {
  name: DokumentNavn.FLETTEFELT,
  type: SanityTyper.OBJECT,
  fields: [
    {
      name: DokumentNavn.FLETTEFELT,
      type: SanityTyper.STRING,
      options: {
        list: [...avslagFlettefelter],
      },
      validation: rule => [rule.required().error('Tomt flettefelt')],
    },
  ],
  preview: {
    select: {
      flettefelt: DokumentNavn.FLETTEFELT,
    },
    prepare: selection => selection,
    component: props => {
      const flettefelt = avslagFlettefelter.find(
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
      of: [begrunnelseFlettefelt],
    },
  ],
})

const begrunnelse = {
  title: 'Begrunnelse',
  name: BegrunnelseDokumentNavn.BEGRUNNELSE,
  type: SanityTyper.DOCUMENT,
  preview: {
    select: {
      title: DokumentNavn.VISNINGSNAVN,
    },
  },
  validation: validerBegrunnelse(),
  fields: [
    {
      title: 'Visningsnavn',
      type: SanityTyper.STRING,
      name: DokumentNavn.VISNINGSNAVN,
      validation: rule => [rule.required().error('Dokumentet må ha et navn')],
    },

    {
      title: 'Begrunnelsetype',
      type: SanityTyper.STRING,
      name: BegrunnelseDokumentNavn.BEGRUNNELSE_TYPE,
      options: {
        list: Object.values(Begrunnelsestype).map(
          begrunnelsestype => begrunnelsestyperTilMenynavn[begrunnelsestype],
        ),
      },
      validation: rule => rule.required().error('Begrunnelsestype ikke valgt'),
    },
    {
      title: 'Api-navn',
      type: SanityTyper.STRING,
      name: DokumentNavn.API_NAVN,
      description: 'Teknisk navn. Eksempel innvilgetInnhenteOpplysninger',
      validation: rule => apiNavnValideringerBegrunnelse(rule, BegrunnelseDokumentNavn.BEGRUNNELSE),
    },
    {
      title: 'Hjemler',
      type: SanityTyper.ARRAY,
      name: BegrunnelseDokumentNavn.HJEMLER,
      of: [{ type: SanityTyper.STRING }],
      options: {
        layout: 'grid',
        list: hjemler.map(hjemmel => ({ value: hjemmel, title: `§${hjemmel}` })),
      },
    },
    editor(DokumentNavn.BOKMAAL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
}

const Flettefelt = styled.span`
    background-color: rgba(30,133,209,0.2);
    text-overflow: ellipsis;
    line-height: normal;
    white-space: nowrap;
    max-inline-size: 160px;
    overflow: hidden;
    display: inline-block;
`

export default begrunnelse
