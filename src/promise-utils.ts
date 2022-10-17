/**
 * Check if the given value is a promise.
 * @param p - The value to check.
 * @returns - Whether the value is a promise.
 * @example
 * ```ts
 * import { isPromise } from 'headless-calendar-fns'
 * isPromise(Promise.resolve()) // true
 * isPromise({ then: () => {} }) // true
 * isPromise({}) // false
 * ```
 */
export function isPromise(p: any) {
  if (typeof p === 'object' && typeof p.then === 'function') {
    return true;
  }

  return false;
}

/** 
 * Check if the given value is a function that returns a promise.
 * @param f - The value to check.
 * @returns - Whether the value is a function that returns a promise.
 * @example
 * ```ts
 * import { returnsPromise } from 'headless-calendar-fns'
 * returnsPromise(() => Promise.resolve()) // true
 * returnsPromise(() => {}) // false
 * returnsPromise({}) // false
 * ```
 */
export function returnsPromise(f: Function) {
  if (
    f.constructor.name === 'AsyncFunction' ||
    (typeof f === 'function' && isPromise(f()))
  ) {
    return true;
  }

  return false;
}