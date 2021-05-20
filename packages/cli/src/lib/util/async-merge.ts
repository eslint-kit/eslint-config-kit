/* eslint-disable @typescript-eslint/no-explicit-any */

import nanoid from 'nanoid'

function isPromise(value: any): boolean {
  return Promise.resolve(value) === value
}

type ProcessingJobsMap = Map<string, Promise<any>>

const processingJobsMap: ProcessingJobsMap = new Map()

export function asyncMerge<T extends Function>(fn: T): T {
  const prefix = nanoid()

  const run = (...args: any[]): any => {
    const jobKey = prefix + '/' + JSON.stringify(args)

    const processingJob = processingJobsMap.get(jobKey)

    if (processingJob) {
      return processingJob
    }

    const result = fn(...args)

    if (!isPromise(result)) {
      return result
    }

    const job: Promise<any> = result

    processingJobsMap.set(jobKey, job)

    const clean = (): void => {
      processingJobsMap.delete(jobKey)
    }

    job.then(clean).catch(clean)

    return job
  }

  return (run as unknown) as T
}
