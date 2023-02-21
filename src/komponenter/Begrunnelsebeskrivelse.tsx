import * as React from 'react';
import { DokumentNavn } from '../util/typer';

export const BegrunnelseBeskrivelse = () => {
  const referenceBaseUrl = window.location.pathname.split('/').slice(0, -1).join('/');

  return (
    <div>
      Sysemet som tar i bruk denne malen vil fylle dette feltet med begrunnelser som er relevante. Begrunnelsene blir hentet fra sanity og er definert{' '}
      <a href={`${referenceBaseUrl}/${DokumentNavn.BEGRUNNELSE}`}>her.</a>
    </div>
  );
};
