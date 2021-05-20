/* eslint-disable @typescript-eslint/no-explicit-any */

import { Options } from 'deepmerge'

export type CustomMerge = (
  key: string,
  options?: Options
) => ((a: any, b: any) => any) | undefined
