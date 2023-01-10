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

    updateOnline: build.mutation<
      { message: string },
      { isOnline: boolean; headers: any }
    >({
      query: ({ isOnline, headers }) => ({
        url: 'user/online',
        method: 'POST',
        body: { isOnline },
        headers,
      }),
    }),
  }),
})

export const {
  useUpdateProfileMutation,
  useLazyGetProfileQuery,
  useDeleteUsersMutation,
  useUpdateOnlineMutation,
} = userApi
