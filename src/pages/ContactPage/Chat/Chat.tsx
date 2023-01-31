import React, { FC, useEffect, useRef, useState } from 'react'
import { IoSend } from 'react-icons/io5'
import cl from './Chat.module.scss'
import { Roles } from '@interfaces/roles.interface'
import { io, Socket } from 'socket.io-client'
import { useAppSelector } from '@hooks/useAppSelector'
import Loader from '@components/UI/Loader/Loader'
import { dateFormat } from '@utils/date.format'

interface IProps {
	masterName?: string
	chatId: number
	messages: {
		id: number
		text: string
		user: { role: Roles }
		createdAt: string
	}[]
	isLoading: boolean
	isShowDate: boolean
}

interface Message {
	id: number
	text: string
	role: string
	userId: number
	chatId: number
	createdAt: string
}

const Chat: FC<IProps> = ({
	masterName,
	chatId,
	messages,
	isLoading,
	isShowDate,
}) => {
	const chatRef = useRef<HTMLUListElement | null>(null)

	const isConnectedRoom = useRef(false)

	const [message, setMessage] = useState('')
	const [socket, setSocket] = useState<Socket>()
	const {
		user: { role, id },
	} = useAppSelector(state => state.auth)

	const [listMessages, setListMessages] = useState<Message[]>(
		id
			? messages.map(el => ({
					id: el.id,
					text: el.text,
					role: el.user.role,
					chatId,
					userId: id,
					createdAt: el.createdAt,
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

	const onKeyDownShiftEnter = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter' && event.shiftKey) {
			event.preventDefault()
			sendMessage()
		}
	}

	const messageListenter = (message: Message) => {
		setListMessages([...listMessages, message])
	}

	useEffect(() => {
		chatRef.current?.lastElementChild?.scrollIntoView()
	}, [listMessages])

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
		if (!process.env.REACT_APP_SOCKET_ADDR) return

		const newSocket = io(process.env.REACT_APP_SOCKET_ADDR)
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
				<ul className={cl.messages} ref={chatRef}>
					{isLoading ? (
						<Loader />
					) : (
						listMessages.map((el, idx) => (
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
								<div className='flex flex-col gap-2 mb-[10px]'>
									<div
										className={
											el.role === Roles.USER
												? cl.user__message
												: el.role === Roles.ADMIN
												? cl.master__message
												: ''
										}
										style={{
											alignSelf:
												el.role === Roles.USER
													? 'self-end'
													: el.role === Roles.ADMIN
													? 'self-start'
													: '',
										}}
									>
										<p>{el.text}</p>
									</div>
									<p
										className={cl.date}
										style={{
											display: isShowDate ? 'block' : 'none',
											alignSelf:
												el.role === Roles.USER
													? 'flex-end'
													: el.role === Roles.ADMIN
													? 'flex-start'
													: '',
										}}
									>
										{dateFormat(el.createdAt, { withTime: true })}
									</p>
								</div>
							</li>
						))
					)}
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
				<IoSend className={cl.icon__send} onClick={sendMessage} />
			</div>
		</div>
	)
}

export default Chat
