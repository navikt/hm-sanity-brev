import type { TitledListValue } from 'sanity'

export function findListValueTitle<T = unknown>(list: ReadonlyArray<TitledListValue<T>>, value: T): string | undefined {
  return list.find(listValue => listValue.value === value)?.title
}
