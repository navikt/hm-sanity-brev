import type { TitledListValue } from 'sanity'

export const DokumentNavn = {
  BLOCK: 'block',
  DOKUMENT: 'dokument',
  BOKMÅL: 'bokmaal',
  NYNORSK: 'nynorsk',
  TITTEL_BOKMAAL: 'tittelBokmaal',
  TITTEL_NYNORSK: 'tittelNynorsk',
  MAPPE: 'mappe',
  VISNINGSNAVN: 'visningsnavn',
  API_NAVN: 'apiNavn',
  FLETTEFELT: 'flettefelt',
  DELMAL: 'delmal',
  DELMAL_AVSNITT: 'delmalAvsnitt',
  DELMAL_REFERANSE: 'delmalReferanse',
  BEGRUNNELSE: 'begrunnelse',
  BEGRUNNELSER: 'begrunnelser',
}

export const Begrunnelsestype = {
  AVSLAG: 'AVSLAG',
  STANSET: 'STANSET',
}

export const begrunnelsestyperTilMenynavn: Record<string, TitledListValue<string>> = {
  AVSLAG: { title: 'Avslag', value: Begrunnelsestype.AVSLAG },
  STANSET: { title: 'Stanset', value: Begrunnelsestype.STANSET },
}

export const BegrunnelseDokumentNavn = {
  BEGRUNNELSE: 'begrunnelse',
  BEGRUNNELSE_TYPE: 'begrunnelsetype',
  HJEMLER: 'hjemler',
}
