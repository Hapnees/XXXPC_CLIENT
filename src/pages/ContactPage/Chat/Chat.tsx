import React, { FC, useState } from 'react'
import { IoSend } from 'react-icons/io5'
import { useHeaders } from '@hooks/useHeaders'
import { useSendMessageMutation } from '@api/chat.api'
import cl from './Chat.module.scss'
import { Roles } from '@interfaces/roles.interface'

interface IProps {
	masterName?: string
	chatId: number
	messages: {
		id: number
		text: string
		user: { role: Roles }
		createdAt: string
	}[]
}

const Chat: FC<IProps> = ({ masterName, chatId, messages }) => {
	const headers = useHeaders()
	const [sendMessage] = useSendMessageMutation()
	const [message, setMessage] = useState('')

	const sandMessageWithParams = () => {
		setMessage('')
		sendMessage({ message, chatId, headers })
	}

	const onKeyDownShiftEnter = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter' && event.shiftKey) {
			event.preventDefault()
			sandMessageWithParams()
		}
	}

	return (
		<div className={cl.wrapper}>
			<div className={cl.header}>
				<p className='text-center'>Мастер {masterName}</p>
			</div>
			<div className='grow'>
				<ul className={cl.messages}>
					{messages.map(message => (
						<li
							key={message.id}
							className={
								message.user.role === Roles.USER
									? 'self-end mr-2'
									: message.user.role === Roles.ADMIN
									? 'self-start ml-2'
									: ''
							}
						>
							<div>
								<p
									className={
										message.user.role === Roles.USER
											? cl.user__message
											: message.user.role === Roles.ADMIN
											? cl.master__message
											: ''
									}
								>
									{message.text}
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>
			<div className={cl.container__message}>
				<textarea
					className={cl.input__message}
					placeholder='Введите сообщение'
					value={message}
					onChange={event => setMessage(event.target.value)}
					onKeyDown={event => onKeyDownShiftEnter(event)}
				/>
				<IoSend className={cl.icon__send} onClick={sandMessageWithParams} />
			</div>
		</div>
	)
}

export default Chat
