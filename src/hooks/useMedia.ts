import { useEffect, useState } from 'react'

export default function useMedia(query: string) {
  const [isMatch, setMatch] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const queryObject = window.matchMedia(query)
    const callback = ({ matches }: MediaQueryListEvent) => setMatch(matches)

    queryObject.addListener(callback)

    return () => queryObject.removeListener(callback)
  }, [query])

  return isMatch
}
