import { ServiceResponse } from '../interfaces/service-response.interface'
import { baseApi } from './baseApi.api'

const baseApiWithTags = baseApi.enhanceEndpoints({ addTagTypes: ['Service'] })

export const serviceApi = baseApiWithTags.injectEndpoints({
  endpoints: build => ({
    getService: build.query<ServiceResponse, number>({
      query: id => ({
        url: `service`,
        params: { id },
      }),
    }),
  }),
})

export const { useGetServiceQuery } = serviceApi
