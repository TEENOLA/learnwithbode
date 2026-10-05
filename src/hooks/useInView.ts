import { useEffect, useRef, useState } from 'react'

/** Returns a ref and a flag that flips to true (and stays true) once the element scrolls into view. */
export function useInView<ElementType extends Element>(threshold = 0.3) {
  const elementRef = useRef<ElementType | null>(null)
  const [hasEnteredView, setHasEnteredView] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element || hasEnteredView) return
    if (typeof IntersectionObserver === 'undefined') {
      setHasEnteredView(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasEnteredView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [hasEnteredView, threshold])

  return { elementRef, hasEnteredView }
}
