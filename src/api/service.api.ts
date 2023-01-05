import {
  IServiceCreate,
  IServiceUpdate,
  ServiceGetResponse,
} from '@interfaces/adminInterfaces/service'
import { ServiceResponse } from '../interfaces/service-response.interface'
import { baseApi } from './baseApi.api'

const baseApiWithTags = baseApi.enhanceEndpoints({ addTagTypes: ['Service'] })

export const serviceApi = baseApiWithTags.injectEndpoints({
  endpoints: build => ({
    updateService: build.mutation<
      { message: string },
      { body: IServiceUpdate; headers: any }
    >({
      query: ({ body, headers }) => ({
        url: 'service/update',
        method: 'PATCH',
        body,
        headers,
      }),
      invalidatesTags: [{ type: 'Service', id: 'LIST' }],
    }),

    deleteServices: build.mutation<
      { message: string },
      { body: number[]; headers: any }
    >({
      query: ({ body, headers }) => ({
        url: 'service/delete',
        method: 'DELETE',
        body,
        headers,
      }),
      invalidatesTags: [{ type: 'Service', id: 'LIST' }],
    }),

    createService: build.mutation<
      { message: string },
      { body: IServiceCreate; headers: any }
    >({
      query: ({ body, headers }) => ({
        url: 'service/create',
        method: 'POST',
        body,
        headers,
      }),
      invalidatesTags: [{ type: 'Service', id: 'LIST' }],
    }),

    getServices: build.query<
      { data: ServiceGetResponse[]; totalCount: any },
      {
        id?: number
        search?: string
        st?: string
        sd?: string
        limit?: number
        page?: number
        headers: any
      }
    >({
      query: ({ id, search, st, sd, limit = 12, page, headers }) => ({
        url: 'service/get',
        params: { search, st, sd, limit, page, id },
        headers,
      }),
      providesTags: [{ type: 'Service', id: 'LIST' }],
    }),

    getService: build.query<ServiceResponse, number>({
      query: id => ({
        url: `service`,
        params: { id },
      }),
    }),
  }),
})

export const {
  useGetServiceQuery,
  useLazyGetServicesQuery,
  useCreateServiceMutation,
  useDeleteServicesMutation,
  useUpdateServiceMutation,
} = serviceApi
