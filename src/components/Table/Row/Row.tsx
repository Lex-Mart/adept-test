import { forwardRef, ReactNode } from 'react'
import cn from 'classnames'

import './Row.scss'

export interface RowProps {
	header?: boolean
	className?: string
	column?: 2 | 3 | 4
	children: ReactNode
}

export const Row = forwardRef<HTMLDivElement, RowProps>(function Row({ children, header, column = 4, className }, ref) {
	return (
		<div ref={ref} className={cn('row', header && 'header', `column${column}`, className)}>
			{children}
		</div>
	)
})
