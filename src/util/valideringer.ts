import { Konstanter } from './konstanter'
import client from 'part:@sanity/base/client'
import groq from 'groq'

const KUN_BOKSTAVER_OG_TALL_UTEN_ÆØÅ = /^[a-zæøå].*/
const FØRSTE_TEGN_ER_LITEN_BOKSTAV = /^[a-z0-9]+$/i

export const apiNavnValideringer = (Rule, type) => [
  Rule.required().error('Feltet må settes'),
  Rule.required()
    .regex(KUN_BOKSTAVER_OG_TALL_UTEN_ÆØÅ)
    .error('Første tegn i feltet kan ikke være tall eller stor bokstav.'),
  Rule.required()
    .regex(FØRSTE_TEGN_ER_LITEN_BOKSTAV)
    .error('Feltet kan kun bestå av tall eller bokstaver (ikke æ,ø, å).'),
  Rule.required()
    .max(Konstanter.API_NAME_MAX_LENGTH)
    .error(`Feltet kan være på maksimalt ${Konstanter.API_NAME_MAX_LENGTH}`),
  Rule.required().custom(async (value, context) => {
    const erUnik = await erUniktApiNavn(type, value, context)

    if (!erUnik) return 'Api-navnet er ikke unikt'

    return true
  }),
]

const erUniktApiNavn = (type, apiNavn, context) => {
  const { document } = context


  const id = document._id.replace(/^drafts\./, '')

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

  return client.withConfig({ apiVersion: '2021-06-07' }).fetch(query, params)
}
