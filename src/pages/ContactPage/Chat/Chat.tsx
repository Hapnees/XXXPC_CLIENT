import React, { FC, useEffect, useRef, useState } from 'react'
import { IoSend } from 'react-icons/io5'
import { useHeaders } from '@hooks/useHeaders'
import cl from './Chat.module.scss'
import { Roles } from '@interfaces/roles.interface'
import { io, Socket } from 'socket.io-client'
import { useAppSelector } from '@hooks/useAppSelector'

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

interface Message {
	text: string
	role: string
	userId: number
	chatId: number
}

//TODO: move <textarea /> to UI-component

const Chat: FC<IProps> = ({ masterName, chatId, messages }) => {
	const isConnectedRoom = useRef(false)
	const headers = useHeaders()

	const [message, setMessage] = useState('')
	const [socket, setSocket] = useState<Socket>()
	const {
		user: { role, id },
	} = useAppSelector(state => state.auth)

	const [listMessages, setListMessages] = useState<Message[]>(
		id
			? messages.map(el => ({
					text: el.text,
					role: el.user.role,
					chatId,
					userId: id,
			  }))
			: []
	)

	const sendMessage = () => {
		socket?.emit(`message`, {
			text: message,
			role,
			chatId,
			userId: id,
		})

		setMessage('')
	}

	// const onKeyDownShiftEnter = (event: React.KeyboardEvent) => {
	// 	if (event.key === 'Enter' && event.shiftKey) {
	// 		event.preventDefault()
	// 		sandMessageWithParams()
	// 	}
	// }

	const messageListenter = (message: Message) => {
		setListMessages([...listMessages, message])
	}

	useEffect(() => {
		//TODO: may be need rework ?_?
		if (!socket || isConnectedRoom.current) return

		socket?.emit('join-room', chatId)
		isConnectedRoom.current = true

		return () => {
			socket?.emit('leave-room', chatId)
		}
	}, [socket])

	useEffect(() => {
		const newSocket = io('http://localhost:8001')
		setSocket(newSocket)
	}, [setSocket])

	useEffect(() => {
		socket?.on(`message`, messageListenter)
		return () => {
			socket?.off(`message`)
		}
	}, [messageListenter])

	return (
		<div className={cl.wrapper}>
			<div className={cl.header}>
				<p className='text-center'>Мастер {masterName}</p>
			</div>
			<div className='grow'>
				<ul className={cl.messages}>
					{/* {messages.map(message => (
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
					))} */}
					{listMessages.map((el, idx) => (
						<li
							key={idx}
							className={
								el.role === Roles.USER
									? 'self-end mr-2'
									: el.role === Roles.ADMIN
									? 'self-start ml-2'
									: ''
							}
						>
							<div>
								<p
									className={
										el.role === Roles.USER
											? cl.user__message
											: el.role === Roles.ADMIN
											? cl.master__message
											: ''
									}
								>
									{el.text}
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
				/>
				<IoSend className={cl.icon__send} onClick={sendMessage} />
			</div>
		</div>
	)
}

export default Chat
