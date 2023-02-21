import { AiOutlineUnorderedList } from 'react-icons/ai';
import { DokumentNavn, SanityTyper } from '../util/typer';
import { apiNavnValideringer } from '../util/valideringer';


const avsnittflettefelterPeriode = ['begrunnelser'];
export const periodeFlettefeltAvsnitt = {
  name: DokumentNavn.FLETTEFELT,
  type: SanityTyper.OBJECT,
  fields: [
    {
      name: DokumentNavn.FELT,
      type: SanityTyper.STRING,
      options: {
        list: avsnittflettefelterPeriode,
      },
      validation: Rule => [Rule.required().error('Tomt flettefelt')],
    },
  ],
  preview: {
    select: {
      title: DokumentNavn.FELT,
    },
    prepare: selection => ({
      title: selection.title,
      media: AiOutlineUnorderedList,
    }),
  },
};

