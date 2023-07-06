import groq from 'groq'
import { StringRule, ValidationContext } from 'sanity'
import { Konstanter } from '../konstanter'
import { Begrunnelsestype } from '../typer'

const KUN_BOKSTAVER_OG_TALL_UTEN_ÆØÅ = /^[a-zæøå].*/
const FØRSTE_TEGN_ER_LITEN_BOKSTAV = /^[a-z0-9]+$/i

export const apiNavnValideringer = (rule: StringRule, type: string) => [
  rule.required().error('Feltet må settes.'),
  rule
    .required()
    .regex(KUN_BOKSTAVER_OG_TALL_UTEN_ÆØÅ)
    .error('Første tegn i feltet kan ikke være tall eller ha stor bokstav.'),
  rule
    .required()
    .regex(FØRSTE_TEGN_ER_LITEN_BOKSTAV)
    .error('Feltet kan kun bestå av tall eller bokstaver (ikke æ,ø, å).'),
  rule
    .required()
    .max(Konstanter.API_NAME_MAX_LENGTH)
    .error(`Feltet kan være på maksimalt ${Konstanter.API_NAME_MAX_LENGTH}`),
  rule.required().custom(async (value, context) => {
    const erUnik = await erUniktApiNavn(type, value, context)
    return erUnik ? true : 'API-navnet er ikke unikt'
  }),
]

const apiNavnPrefiksMap: Record<string, string> = {
  AVSLAG: 'avslag',
}

export const apiNavnValideringerBegrunnelse = (rule: StringRule, type: string) => {
  return [
    ...apiNavnValideringer(rule, type),
    rule.custom<string>((value, context): true | string => {
      const begrunnelsestype = context.document?.begrunnelsetype as string

      if (!Object.values(Begrunnelsestype).includes(begrunnelsestype)) {
        return (
          'Begrunnelsestypen er ikke satt og valideringen for API-navnet avhenger av begrunnelsestypen. ' +
          'Sett begrunnelsestype før du setter API-navn.'
        )
      }

      const harRiktigPrefix = value?.startsWith(apiNavnPrefiksMap[begrunnelsestype])
      return harRiktigPrefix
        ? true
        : `Begrunnelsen er av typen ${begrunnelsestype}. API-navnet må derfor starte med ${apiNavnPrefiksMap[begrunnelsestype]}.`
    }),
  ]
}

const erUniktApiNavn = (type: any, apiNavn: string | undefined, context: ValidationContext) => {
  const { document } = context

  const id = document?._id.replace(/^drafts\./, '')

  const params = {
    draft: `drafts.${id}`,
    published: id,
    type,
    apiNavn,
  }

  const query = groq`!defined(*[
        _type == $type &&
        !(_id in [$draft, $published]) &&
        apiNavn == $apiNavn
    ][0]._id)`

  return context.getClient({ apiVersion: '2021-06-07' }).fetch(query, params)
}
