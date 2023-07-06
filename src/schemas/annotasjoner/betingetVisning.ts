import { EyeOpenIcon } from '@sanity/icons'
import { defineArrayMember, defineField, TitledListValue } from 'sanity'

export function betingetVisning(betingelser: ReadonlyArray<TitledListValue<string>>) {
  return defineArrayMember({
    title: 'Betinget visning',
    name: 'betingetVisning',
    type: 'object',
    icon: EyeOpenIcon,
    fields: [
      defineField({
        title: 'Betingelse',
        name: 'betingelse',
        type: 'string',
        options: {
          list: [...betingelser],
        },
        validation(rule) {
          return [rule.required().error('Tom betingelse')]
        },
      }),
    ],
  })
}
