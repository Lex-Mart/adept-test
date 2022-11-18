import { FC } from 'react'
import cn from 'classnames'

import './Cell.scss'

export interface CellProps {
	className?: string
}

export const Cell: FC<CellProps> = ({ children, className }) => {
	return <div className={cn('cell', className)}>{children}</div>
}
