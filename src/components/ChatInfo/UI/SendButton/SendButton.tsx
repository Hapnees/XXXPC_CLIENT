import React, { FC } from 'react'
import cl from './SendButton.module.scss'

interface IProps {
	onClick?: () => void
	value?: string
}

const SendButton: FC<IProps> = ({ onClick, value }) => {
	return (
		<button className={cl.button} onClick={onClick}>
			{value || 'Отправить'}
		</button>
	)
}

export default SendButton
