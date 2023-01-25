import React, { useEffect, useState } from 'react'
import { useAuth } from '@hooks/useAuth'
import customToast from '@utils/customToast'
import Chat from './Chat/Chat'
import Loader from '@components/UI/Loader/Loader'
import cl from './ContactPage.module.scss'
import { useLazyGetChatQuery, useSendChatRequestMutation } from '@api/chat.api'
import { useHeaders } from '@hooks/useHeaders'
import { useAppSelector } from '@hooks/useAppSelector'
import { ChatStatus } from '@interfaces/chat.interface'
import { io, Socket } from 'socket.io-client'

const ContactPage = () => {
	const [getChat, { data: chatData }] = useLazyGetChatQuery()
	const { isNeededRefresh } = useAppSelector(state => state.auth)
	const [useSendChatRequest] = useSendChatRequestMutation()
	const [issue, setIssue] = useState('')
	const isAuth = useAuth()
	const headers = useHeaders()

	const [socket, setSocket] = useState<Socket>()

	const onClickRequestChat = () => {
		if (!isAuth) {
			customToast.info('Авторизуйтесь для этой операции')
			return
		}

		useSendChatRequest({ issue, headers })
			.unwrap()
			.then(() => getChat(headers))
	}

	const acceptListener = (data: { isAccepted: boolean }) => {
		if (!data.isAccepted) return

		getChat(headers)
	}

	useEffect(() => {
		if (isNeededRefresh) return

		getChat(headers)
	}, [isNeededRefresh])

	useEffect(() => {
		const newSocket = io('http://localhost:8001')
		setSocket(newSocket)
	}, [setSocket])

	useEffect(() => {
		socket?.on('accept', acceptListener)

		return () => {
			socket?.off('accept')
		}
	}, [acceptListener])

	return (
		<div className='flex justify-center items-center gap-[70px] pt-[150px]'>
			<div>
				<div className={cl.container__info}>
					<p className='mb-4'>Контактная информация</p>
					<div className='mb-2'>
						<p>+7 777 777 77 77</p>
						<p>+7 888 888 88 88</p>
					</div>
					<p>xxxpcservice@gmail.com</p>
				</div>
			</div>

			<div className={cl.chat__info}>
				{chatData?.status === ChatStatus.PENDING ? (
					<div className='flex flex-col justify-center h-full w-full'>
						<p className='text-center'>
							Ваш запрос отправлен. Ожидайте ответа мастера
						</p>
						<div className='w-full h-[200px] flex items-center'>
							<Loader />
						</div>
					</div>
				) : chatData?.status === ChatStatus.ACCEPTED ? (
					<Chat
						masterName={chatData.masterName}
						chatId={chatData.id}
						messages={chatData.Message}
					/>
				) : (
					<div className='flex flex-col'>
						<p className='mb-6'>
							Кратко опишите вашу проблему и нажмите на кнопку "Отправить". Как
							только один из мастеров освободится, он рассмотрит ваш запрос
						</p>
						<textarea
							className={cl.input__message}
							value={issue}
							onChange={event => setIssue(event.target.value)}
						/>
						<button className={cl.button} onClick={onClickRequestChat}>
							Отправить
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default ContactPage
