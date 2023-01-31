import { useAppSelector } from '@hooks/useAppSelector'
import { useHeaders } from '@hooks/useHeaders'
import { IChat } from '@interfaces/chat.interface'
import { useEffect } from 'react'
import { Socket } from 'socket.io-client'

// Слушаем событие chat-accept
export const useChatAccept = (
	getChat: (headers: any) => void,
	chatData?: IChat,
	socket?: Socket
) => {
	const headers = useHeaders()
	const {
		user: { role },
	} = useAppSelector(state => state.auth)

	const acceptListener = (data: { isAccepted: boolean }) => {
		if (data.isAccepted) getChat(headers)
	}

	useEffect(() => {
		if (!socket) return

		socket.on('chat-accept', acceptListener)

		if (!chatData) return
		socket.emit('chat-accept', { chatId: chatData.id, role })

		return () => {
			socket.off('chat-accept')
		}
	}, [acceptListener, chatData])
}
