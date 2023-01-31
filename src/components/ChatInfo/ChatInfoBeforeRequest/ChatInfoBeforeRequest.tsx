import React, { FC, useState } from 'react'
import { useAppSelector } from '@hooks/useAppSelector'
import { useAuth } from '@hooks/useAuth'
import { useHeaders } from '@hooks/useHeaders'
import customToast from '@utils/customToast'
import { Socket } from 'socket.io-client'
import SendButton from '../UI/SendButton/SendButton'
import cl from './ChatInfoBeforeRequest.module.scss'
import IssueField from '../UI/IssueField/IssueField'
import { info } from './info'

interface IProps {
	socket?: Socket
	getChat: Awaited<Promise<PromiseLike<any>>>
}

const ChatInfoBeforeRequest: FC<IProps> = ({ socket, getChat }) => {
	const [issue, setIssue] = useState('')
	const isAuth = useAuth()
	const headers = useHeaders()
	const {
		user: { id, role },
	} = useAppSelector(state => state.auth)

	const onClickRequestChat = () => {
		if (!isAuth) {
			customToast.info(info.forNotAuth)
			return
		}

		socket?.on('chat-request', fullfieldListener)
		socket?.emit('chat-request', { dto: { issue }, userId: id, role })
	}

	const fullfieldListener = (data: { isFullfield: boolean }) => {
		if (data.isFullfield)
			getChat(headers)
				.unwrap()
				.then(() => {
					socket?.off('chat-request')
				})
	}

	return (
		<div className={cl.wrapper}>
			<p className='mb-6'>{info.main}</p>
			<IssueField issue={issue} setIssue={setIssue} />
			<SendButton onClick={onClickRequestChat} />
		</div>
	)
}

export default ChatInfoBeforeRequest
