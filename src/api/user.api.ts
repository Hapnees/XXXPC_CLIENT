import { IUserUpdate } from '../interfaces/user-update.interface'
import { baseApi } from './baseApi.api'

const userApi = baseApi.injectEndpoints({
	endpoints: build => ({
		updateUser: build.mutation<
			{ message: string },
			{ body: IUserUpdate; headers: any }
		>({
			query: ({ body, headers }) => ({
				url: 'user/update',
				method: 'PATCH',
				body,
				headers,
			}),
		}),

		getProfile: build.query<Required<Omit<IUserUpdate, 'password'>>, any>({
			query: headers => ({
				url: 'user/profile',
				headers,
			}),
		}),
	}),
})

export const { useUpdateUserMutation, useGetProfileQuery } = userApi
