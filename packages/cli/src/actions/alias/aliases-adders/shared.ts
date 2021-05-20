/* eslint-disable @typescript-eslint/no-explicit-any */

import merge from 'deepmerge'

export const combineMerge = (target: any, source: any, options: any): any[] => {
  const destination = target.slice()

  source.forEach((item: any, index: number) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options)
    } else if (options.isMergeableObject(item)) {
      destination[index] = merge(target[index], item, options)
    } else if (target.indexOf(item) === -1) {
      destination.push(item)
    }
  })

  return destination
}
