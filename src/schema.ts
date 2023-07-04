import { SchemaTypeDefinition } from 'sanity'
import { Begrunnelse } from './schemas/Begrunnelse'
import { Delmal } from './schemas/Delmal'
import { Dokument } from './schemas/Dokument'

export const schema: SchemaTypeDefinition[] = [Dokument, Delmal, Begrunnelse]
