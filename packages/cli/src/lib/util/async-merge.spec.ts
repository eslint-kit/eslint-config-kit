import { asyncMerge } from './async-merge'

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

describe('wrapIntoAsyncMerge', () => {
  it('should work for non-async functions', () => {
    const add = (a: number, b: number): number => a + b

    const asyncMergedAdd = asyncMerge(add)

    expect(asyncMergedAdd(2, 2)).toBe(4)

    const createObject = (): {} => ({})

    const asyncMergedCreateObject = asyncMerge(createObject)

    const obj1 = asyncMergedCreateObject()
    const obj2 = asyncMergedCreateObject()

    expect(obj1).not.toBe(obj2)
  })

  it('should work for async functions', async () => {
    const asyncMergedWait = asyncMerge(wait)

    const firstPromise = asyncMergedWait(200)

    const promises = Array.from({ length: 10 }, () => asyncMergedWait(200))

    for (const promise of promises) {
      expect(promise).toBe(firstPromise)
    }

    await firstPromise

    const secondPromise = asyncMergedWait(200)

    expect(secondPromise).not.toBe(firstPromise)

    // different arguments
    const thirdPromise = asyncMergedWait(300)

    expect(thirdPromise).not.toBe(secondPromise)
  })

  it('should work for independent async functions', async () => {
    const asyncMergedWait = asyncMerge(wait)

    const wrappedWait: typeof wait = ms => wait(ms)

    const asyncMergedWrappedWait = asyncMerge(wrappedWait)

    const firstPromise = asyncMergedWait(200)
    const secondPromise = asyncMergedWrappedWait(200)

    expect(secondPromise).not.toBe(firstPromise)

    await firstPromise
    await secondPromise
  })

  it('should do not catch errors', async done => {
    const fn = (): Promise<never> => Promise.reject('hello')

    const wrappedFn = asyncMerge(fn)

    try {
      await wrappedFn()

      done.fail('asyncMerge caught the error')
    } catch (err) {
      expect(err).toBe('hello')
    }

    done()
  })
})
