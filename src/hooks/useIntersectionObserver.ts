import { useCallback, useRef } from 'react'

export const useIntObserver = (fn: (disconnect: () => void) => void, deps: unknown[]) => {
	const intObserver = useRef<null | IntersectionObserver>(null)
	const refFn = useCallback((elem) => {
		if (intObserver.current) intObserver.current.disconnect()

		intObserver.current = new IntersectionObserver((elems, observer) => {
			if (elems[0].isIntersecting) {
				fn(() => observer.disconnect())
			}
		})

		if (elem) intObserver.current.observe(elem)
	}, deps)

	return refFn
}
