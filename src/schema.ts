import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import Dokument from './schemas/Dokument'
import Delmal from './schemas/Delmal'
import Flettefelt from './schemas/felter/Flettefelt'
import { localeString } from './util/typer'

sessionStorage.clear()

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([Dokument, Delmal, Flettefelt, localeString]),
})
