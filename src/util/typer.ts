import { LOADING_PANE } from '@sanity/desk-tool'

export enum DokumentNavn {
    BLOCK = 'block',
  DOKUMENT = 'dokument',
  BOKMAAL = 'bokmaal',
  NYNORSK = 'nynorsk',
  TITTEL = 'tittel',
  MAPPE = 'mappe',
  VISNINGSNAVN = 'visningsnavn',
  API_NAVN = 'apiNavn',
  ER_LISTE = 'erListe',
  ER_FRITEKSTFELT = 'erFritektsfelt',
  FELT = 'felt',
  FELT_VISNINGSNAVN = 'feltVisningsnavn',
  FLETTEFELT = 'flettefelt',
  FLETTEFELT_REFERANSE = 'flettefeltReferanse',
  DELMAL = 'delmal',
  DELMAL_REFERANSE = 'delmalReferanse',
  SKAL_ALLTID_MED = 'skalAlltidMed',
}

export enum SanityTyper {
  STRING = 'string',
  REFERENCE = 'reference',
  BOOLEAN = 'boolean',
  OBJECT = 'object',
  ARRAY = 'array',
  BLOCK = 'block',
  DOCUMENT = 'document',
  LOCALE_STRING = 'localeString',
}

const supportedLanguages = [
  { id: 'no_nb', title: 'Norsk bokmål', isDefault: true },
  { id: 'no_nn', title: 'Norsk nynorsk' },
]

export const localeString = {
  title: 'Oversettelse string',
  name: 'localeString',
  type: 'object',

  fieldsets: [{ title: 'Translations', name: 'translations', option: { collapsible: true } }],
  fields: supportedLanguages.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: SanityTyper.STRING,
    fieldset: lang.isDefault ? null : 'translations',
  })),
}
