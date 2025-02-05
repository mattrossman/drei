import { useState, useLayoutEffect } from 'react'

type RefType<T> = React.MutableRefObject<T> | ((state: T) => void)

function call<T>(ref: RefType<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value as T)
  else if (ref != null) ref.current = value as T
}

export default function useEffectfulState<T>(fn: () => T, deps: React.DependencyList = [], cb?: RefType<T>) {
  const [state, set] = useState<T>()
  useLayoutEffect(() => {
    const value = fn()
    set(value)
    call(cb, value)
    return () => call(cb, null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return state
}
