import { RepairCardsGetResponse } from '../interfaces/adminInterfaces/repair-cards-get.interface'
import {
  IRepairCard,
  RepairCardResponse,
} from '../interfaces/repair/repair-card.interface'
import { baseApi } from './baseApi.api'

const repairApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getRepairCards: build.query<RepairCardsGetResponse[], any>({
      query: headers => ({
        url: 'repair/get',
        headers,
      }),
    }),

    createRepairCard: build.mutation<RepairCardResponse, IRepairCard>({
      query: body => ({
        url: 'repair/create',
        method: 'POST',
        body,
      }),
    }),
    getRepairCard: build.query<RepairCardResponse, string>({
      query: slug => ({
        url: `repair/card`,
        params: { slug },
      }),
    }),
  }),
})

export const { useGetRepairCardQuery, useGetRepairCardsQuery } = repairApi
