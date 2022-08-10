import { useEffect, useRef, useState } from 'react'

function useFocus() {
  const [isFocus, setFocus] = useState(false)
  const focusRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!focusRef.current) return
    const { current } = focusRef

    const handleFocus = () => setFocus(true)
    const handleBlur = () => setFocus(false)

    current.addEventListener('focus', handleFocus)
    current.addEventListener('blur', handleBlur)

    return () => {
      current.removeEventListener('focus', handleFocus)
      current.removeEventListener('blur', handleBlur)
    }
  }, [focusRef])

  return {
    isFocus,
    focusRef,
  }
}

export { useFocus }
