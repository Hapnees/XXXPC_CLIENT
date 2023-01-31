import React, { FC } from 'react'
import Loader from '@components/UI/Loader/Loader'
import { ChatStatus, IChat } from '@interfaces/chat.interface'
import { Socket } from 'socket.io-client'
import Chat from 'src/pages/ContactPage/Chat/Chat'
import cl from './ChatInfo.module.scss'
import ChatInfoBeforeRequest from './ChatInfoBeforeRequest/ChatInfoBeforeRequest'

const info = 'Ваш запрос отправлен. Ожидайте ответа мастера'

interface IProps {
	chatData?: IChat
	isLoadingData: boolean
	isShowDate: boolean
	socket?: Socket
	getChat: (headers: any) => Awaited<Promise<PromiseLike<any>>>
}

const ChatInfo: FC<IProps> = ({
	chatData,
	isLoadingData,
	isShowDate,
	socket,
	getChat,
}) => {
	return (
		<div className={cl.wrapper}>
			{chatData?.status === ChatStatus.PENDING ? (
				<div className='flex flex-col justify-center h-full w-full'>
					<p className='text-center'>{info}</p>
					<div className='w-full h-[200px] flex items-center'>
						<Loader />
					</div>
				</div>
			) : chatData?.status === ChatStatus.ACCEPTED ? (
				<Chat
					masterName={chatData.masterName}
					chatId={chatData.id}
					messages={chatData.Message}
					isLoading={isLoadingData}
					isShowDate={isShowDate}
				/>
			) : (
				<ChatInfoBeforeRequest socket={socket} getChat={getChat} />
			)}
		</div>
	)
}

export default ChatInfo
