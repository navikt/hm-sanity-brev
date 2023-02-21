export const validerBegrunnelse = () => rule =>
  rule.custom((verdi: string, kontekst): true | string => {
    const feil = [];

    kontekst.type.fields.forEach(field => {
      const erHidden = field?.type?.hidden ? field.type.hidden(kontekst) : false;
      if (erHidden && kontekst.document[field.name] !== undefined) {
        feil.push(
          `${field.type.title} er skjult, men har verdiene ${kontekst.document[field.name].join(
            ', ',
          )} satt. Fjern disse før du publiserer eller ta kontakt med en utvikler.`,
        );
      }
    });

    if (feil.length !== 0) {
      return feil.join('\n');
    } else {
      return true;
    }
  });
