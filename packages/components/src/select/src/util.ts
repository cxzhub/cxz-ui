import { isArray } from 'lodash-es'
import { escapeStringRegexp } from 'element-plus/es/utils/index'

import { Config } from './select.types'

export const flattenOptions = (
  options: Record<string, any>[],
  config: Config
) => {
  const flattened: Record<string, any>[] = []
  options.forEach((option) => {
    if (isArray(option[config.children])) {
      flattened.push({
        [config.label]: option[config.label],
        isTitle: true,
        [config.type]: 'Group'
      })
      option[config.children].forEach((o: Record<string, any>) => {
        flattened.push(o)
      })
      flattened.push({
        [config.type]: 'Group'
      })
    } else {
      flattened.push(option)
    }
  })

  return flattened
}

export function isValidOption(
  o: Record<string, any>,
  config: Config,
  query?: string
) {
  const regexp = new RegExp(escapeStringRegexp(query), 'i')
  const containsQueryString = query ? regexp.test(o[config.label] || '') : true
  return containsQueryString
}
