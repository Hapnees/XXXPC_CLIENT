import {
  UserUpdateRequest,
  UsersGetResponse,
} from '@interfaces/adminInterfaces/user'
import { IUserProfile, IUserUpdate } from '../interfaces/user'
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

    getUsers: build.query<
      { data: UsersGetResponse[]; totalCount: number },
      { search?: string; limit?: number; page?: number; headers: any }
    >({
      query: ({ headers, search, limit = 15, page }) => ({
        url: 'user/get',
        params: { search, limit, page },
        headers,
      }),
      providesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
})

export const {
  useUpdateProfileMutation,
  useLazyGetProfileQuery,
  useLazyGetUsersQuery,
  useUpdateUsersMutation,
  useDeleteUsersMutation,
} = userApi
