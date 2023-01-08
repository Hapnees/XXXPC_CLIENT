import {
  IOrderForm,
  OrderCreateResponse,
  OrderGetResponse,
} from '@interfaces/order'
import { SortDirect } from '@interfaces/order/order-sort.enum'
import { OrderStatus } from '@interfaces/order/order-status.enum'
import { baseApi } from './baseApi.api'

const baseApiWithTags = baseApi.enhanceEndpoints({ addTagTypes: ['Orders'] })

export const orderApi = baseApiWithTags.injectEndpoints({
  endpoints: build => ({
    getNote: build.query<{ note: string }, number>({
      query: id => ({
        url: 'order/get/note',
        params: { id },
      }),
    }),
    createOrder: build.mutation<
      OrderCreateResponse,
      { body: IOrderForm; headers: any }
    >({
      query: ({ body, headers }) => ({
        url: 'order/create',
        method: 'POST',
        body,
        headers,
      }),
      invalidatesTags: [{ type: 'Orders', id: 'USER_LIST' }],
    }),
    getOrderByUser: build.query<
      { data: OrderGetResponse[]; totalCount: number },
      {
        search?: string
        limit?: number
        page?: number
        st?: string
        sd?: SortDirect
        fs?: OrderStatus
        headers: any
      }
    >({
      query: ({ headers, search, limit = 15, page = 1, st, sd, fs }) => ({
        url: 'order/get',
        params: { search, limit, page, st, sd, fs },
        headers,
      }),
      providesTags: [{ type: 'Orders', id: 'USER_LIST' }],
    }),
  }),
})

export const {
  useCreateOrderMutation,
  useLazyGetOrderByUserQuery,
  useGetNoteQuery,
} = orderApi
