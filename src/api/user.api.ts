import { UserUpdateRequest } from '../interfaces/adminInterfaces/user-update.interface'
import { UsersGetResponse } from '../interfaces/adminInterfaces/users-get.interface'
import { IUserProfile } from '../interfaces/user/user-profile.interface'
import { IUserUpdate } from '../interfaces/user/user-update.interface'
import { baseApi } from './baseApi.api'

const apiWithTags = baseApi.enhanceEndpoints({ addTagTypes: ['Users'] })

const userApi = apiWithTags.injectEndpoints({
  endpoints: build => ({
    deleteUsers: build.mutation<
      { message: string },
      { body: { ids: number[] }; headers: any }
    >({
      query: ({ body, headers }) => ({
        url: 'user/delete/admin',
        method: 'DELETE',
        body,
        headers,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),

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
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),

    updateProfile: build.mutation<
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
      providesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
})

export const {
  useUpdateProfileMutation,
  useLazyGetProfileQuery,
  useGetUsersQuery,
  useUpdateUsersMutation,
  useDeleteUsersMutation,
} = userApi
