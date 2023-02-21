import { DokumentNavn, SanityTyper } from '../../util/typer';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BegrunnelseBeskrivelse } from '../../komponenter/Begrunnelsebeskrivelse';

export const begrunnelseAvsnitt = {
  name: DokumentNavn.BEGRUNNELSER,
  type: SanityTyper.OBJECT,
  title: 'Begrunnelser',
  fields: [
    {
      name: 'begrunnelseBeskrivelse',
      type: SanityTyper.STRING,
      inputComponent: BegrunnelseBeskrivelse,
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: selection => {
      const { title } = selection;
      return {
        media: AiOutlineUnorderedList,
        title: title,
      };
    },
  },
};
