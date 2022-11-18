import { forwardRef, HTMLProps } from 'react'
import cn from 'classnames'
import './TableInput.scss'

export const TableInput = forwardRef<HTMLTextAreaElement, HTMLProps<HTMLTextAreaElement>>(function TableInput(
	{ ...props },
	ref,
) {
	const { className, ...rest } = props

	return <textarea {...rest} className={cn('input', className)} ref={ref} />
})
