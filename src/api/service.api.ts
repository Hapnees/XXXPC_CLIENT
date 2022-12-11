import { ServiceGetResponse } from '../interfaces/adminInterfaces/service-get.interface'
import { ServiceResponse } from '../interfaces/service-response.interface'
import { baseApi } from './baseApi.api'

export const serviceApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getServices: build.query<ServiceGetResponse[], any>({
      query: headers => ({
        url: 'service/get',
        headers,
      }),
    }),

    getService: build.query<ServiceResponse, number>({
      query: id => ({
        url: `service`,
        params: { id },
      }),
    }),
  }),
})

export const { useGetServiceQuery, useGetServicesQuery } = serviceApi
