import React, { useEffect, useState } from 'react'
import { useLazyGetChatQuery } from '@api/chat.api'
import { useHeaders } from '@hooks/useHeaders'
import { useAppSelector } from '@hooks/useAppSelector'
import { Socket } from 'socket.io-client'
import cl from './ContactPage.module.scss'
import { useChatAccept } from './hooks/useChatAccept'
import { useCreateSocket } from './hooks/useCreateSocket'
import Checkbox from '@components/UI/Checkbox/Checkbox'
import ContactInfo from './ContactInfo/ContactInfo'
import ChatInfo from '@components/ChatInfo/ChatInfo'

const ContactPage = () => {
	const [getChat, { data: chatData, isLoading }] = useLazyGetChatQuery()
	const [isShowDate, setIsShowDate] = useState(false)
	const { isNeededRefresh } = useAppSelector(state => state.auth)

	const headers = useHeaders()

	const [socket, setSocket] = useState<Socket>()

	// Получаем данные о чате после обновления токена
	useEffect(() => {
		if (isNeededRefresh) return

		getChat(headers)
	}, [isNeededRefresh])

	// Создаём сокет
	useCreateSocket(setSocket)

	// Слушаем событие chat-accept
	useChatAccept(getChat, chatData, socket)

	return (
		<div className={cl.wrapper}>
			<div>
				<ContactInfo />
				<Checkbox isShow={isShowDate} setIsShow={setIsShowDate} />
			</div>

			<ChatInfo
				socket={socket}
				getChat={getChat}
				chatData={chatData}
				isShowDate={isShowDate}
				isLoadingData={isLoading}
			/>
		</div>
	)
}

export default ContactPage
