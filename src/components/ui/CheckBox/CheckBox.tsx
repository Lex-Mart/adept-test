import { forwardRef, HTMLAttributes } from 'react'
import cn from 'classnames'
import './CheckBox.scss'

export interface CheckBoxProps {
	checked?: boolean
}

export const CheckBox = forwardRef<HTMLInputElement, HTMLAttributes<HTMLInputElement> & CheckBoxProps>(
	function CheckBox({ className, ...props }, ref) {
		return <input {...props} className={cn('checkbox', className)} type="checkbox" ref={ref} />
	},
)
