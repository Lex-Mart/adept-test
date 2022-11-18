import { FC, ReactChild } from 'react'
import classnames from 'classnames'

import './Button.scss'

interface ButtonProps {
	children?: ReactChild
	onClick?: () => void
	variant?: 'green' | 'red'
	disabled?: boolean
	className?: string
}

export const Button: FC<ButtonProps> = ({ children, onClick, variant = '', disabled, className }) => {
	return (
		<button className={classnames('Button', variant, className)} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	)
}
