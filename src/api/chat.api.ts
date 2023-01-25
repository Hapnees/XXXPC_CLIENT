import { IChat } from '@interfaces/chat.interface'
import { baseApi } from './baseApi.api'

const baseApiWithTags = baseApi.enhanceEndpoints({ addTagTypes: ['Chat'] })

export const chatApi = baseApiWithTags.injectEndpoints({
	endpoints: build => ({
		sendChatRequest: build.mutation<void, { issue: string; headers: any }>({
			query: ({ issue, headers }) => ({
				url: 'chat/send/request',
				method: 'POST',
				body: { issue },
				headers,
			}),
		}),

		sendMessage: build.mutation<
			void,
			{ message: string; chatId: number; headers: any }
		>({
			query: ({ message, chatId, headers }) => ({
				url: 'chat/send/message',
				method: 'POST',
				body: { message, chatId },
				headers,
			}),
			invalidatesTags: [{ type: 'Chat', id: 'LIST' }],
		}),

		getChat: build.query<IChat, any>({
			query: headers => ({
				url: 'chat/get',
				headers,
			}),
			providesTags: [{ type: 'Chat', id: 'LIST' }],
		}),
	}),
})

export const {
	useSendChatRequestMutation,
	useSendMessageMutation,
	useLazyGetChatQuery,
} = chatApi
