import React, { ButtonHTMLAttributes, FC } from 'react'
import cl from './SpecialButton.module.scss'

interface IProps {
	children: React.ReactNode
}

const SpecialButton: FC<IProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
	className,
	children,
}) => {
	return <button className={`${cl.button} ${className}`}>{children}</button>
}

export default SpecialButton
