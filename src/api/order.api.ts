import { OrdersGetResponse } from '../interfaces/adminInterfaces/orders-get.interface'
import { OrderCreateResponse } from '../interfaces/order/order-create-response.interface'
import { OrderGetResponse } from '../interfaces/order/order-get-response.interface'
import { IOrderForm } from '../interfaces/order/order.interface'
import { baseApi } from './baseApi.api'

export const orderApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getOrders: build.query<OrdersGetResponse[], any>({
      query: headers => ({
        url: 'order/get/all',
        headers,
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
    }),
    getOrderByUser: build.query<OrderGetResponse[], any>({
      query: headers => ({
        url: 'order/get',
        headers,
      }),
    }),
  }),
})

export const {
  useCreateOrderMutation,
  useGetOrderByUserQuery,
  useGetOrdersQuery,
} = orderApi
