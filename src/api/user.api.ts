import { UserUpdateRequest } from '../interfaces/adminInterfaces/user-update.interface'
import { UsersGetResponse } from '../interfaces/adminInterfaces/users-get.interface'
import { IUserProfile } from '../interfaces/user/user-profile.interface'
import { IUserUpdate } from '../interfaces/user/user-update.interface'
import { baseApi } from './baseApi.api'

const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    updateUsers: build.mutation<
      { message: string },
      { body: UserUpdateRequest; headers: any }
    >({
      query: ({ body, headers }) => ({
        url: 'user/update/admin',
        method: 'PATCH',
        body,
        headers,
      }),
    }),

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

    getProfile: build.query<IUserProfile, any>({
      query: headers => ({
        url: 'user/profile',
        headers,
      }),
    }),

    getUsers: build.query<UsersGetResponse[], any>({
      query: headers => ({
        url: 'user/get',
        headers,
      }),
    }),
  }),
})

export const {
  useUpdateUserMutation,
  useLazyGetProfileQuery,
  useGetUsersQuery,
  useUpdateUsersMutation,
} = userApi
