import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedState, setDebouncedState] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedState(value), delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedState
}
