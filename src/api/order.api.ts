import { IOrderUpdate } from '@interfaces/adminInterfaces/order-update.interface'
import { OrdersGetResponse } from '../interfaces/adminInterfaces/orders-get.interface'
import { OrderCreateResponse } from '../interfaces/order/order-create-response.interface'
import { OrderGetResponse } from '../interfaces/order/order-get-response.interface'
import { IOrderForm } from '../interfaces/order/order.interface'
import { baseApi } from './baseApi.api'

const baseApiWithTags = baseApi.enhanceEndpoints({ addTagTypes: ['Orders'] })

export const orderApi = baseApiWithTags.injectEndpoints({
  endpoints: build => ({
    orderDelete: build.mutation<
      { message: string },
      { body: number[]; headers: any }
    >({
      query: ({ body, headers }) => ({
        url: 'order/delete/admin',
        method: 'DELETE',
        body,
        headers,
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),

    orderUpdate: build.mutation<
      { message: string },
      { body: IOrderUpdate; headers: any }
    >({
      query: ({ body, headers }) => ({
        url: 'order/update/admin',
        method: 'PATCH',
        body,
        headers,
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),

    getOrders: build.query<OrdersGetResponse[], { id?: number; headers: any }>({
      query: ({ headers, id }) => ({
        url: 'order/get/admin',
        params: { id },
        headers,
      }),
      providesTags: [{ type: 'Orders', id: 'LIST' }],
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
    getOrderByUser: build.query<OrderGetResponse[], any>({
      query: headers => ({
        url: 'order/get',
        headers,
      }),
      providesTags: [{ type: 'Orders', id: 'USER_LIST' }],
    }),
  }),
})

export const {
  useCreateOrderMutation,
  useGetOrderByUserQuery,
  useGetOrdersQuery,
  useOrderUpdateMutation,
  useOrderDeleteMutation,
} = orderApi
