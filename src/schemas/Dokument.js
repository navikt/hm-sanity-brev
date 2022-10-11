import { DokumentNavn, SanityTyper } from '../util/typer'
import decorators from '../util/decorators'
import FlettefeltAnnotering from './annoteringer/FlettefeltAnnotering'
import { delmalAvsnitt } from './avsnitt/delmalAvsnitt'
import { flettefeltAvsnitt } from './avsnitt/flettefeltAvsnitt'
import TekstStyles from '../util/TekstStyles'
import { apiNavnValideringer } from '../util/valideringer'

const editor = (maalform, tittel) => ({
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
