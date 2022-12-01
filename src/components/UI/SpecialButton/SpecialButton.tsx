import React, { ButtonHTMLAttributes, FC } from 'react'
import cl from './SpecialButton.module.scss'

interface IProps {
	children: React.ReactNode
	isAuthOpen: boolean
}

const SpecialButton: FC<IProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
	className,
	children,
	isAuthOpen,
	...props
}) => {
	return (
		<button
			className={
				!isAuthOpen
					? `${cl.button} ${className}`
					: `${cl.button} ${cl.button__clicked} ${className}`
			}
			{...props}
		>
			{children}
		</button>
	)
}

export default SpecialButton
