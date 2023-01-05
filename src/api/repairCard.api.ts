import {
  IRepairCardCreate,
  RepairCardSlug,
  RepairCardsGetResponse,
} from '@interfaces/adminInterfaces/repair-card'
import { RepairCardResponse } from '../interfaces/repair/repair-card.interface'
import { baseApi } from './baseApi.api'

const baseApiWithTags = baseApi.enhanceEndpoints({
  addTagTypes: ['RepairCards'],
})

const repairApi = baseApiWithTags.injectEndpoints({
  endpoints: build => ({
    getUsedRepairCardSlugs: build.query<{ slugs: RepairCardSlug }, any>({
      query: headers => ({
        url: 'repair/get/card/slugs',
        headers,
      }),
    }),

    adminDeleteRepairCard: build.mutation<
      { message: string },
      { body: number[]; headers: any }
    >({
      query: ({ body, headers }) => ({
        url: 'repair/delete',
        method: 'DELETE',
        body,
        headers,
      }),
      invalidatesTags: [{ type: 'RepairCards', id: 'LIST_ALL' }],
    }),

    adminGetRepairCardDetails: build.query<
      RepairCardsGetResponse,
      { id: number; headers: any }
    >({
      query: ({ id, headers }) => ({
        url: `repair/get/card/${id}`,
        headers,
      }),
      providesTags: [{ type: 'RepairCards', id: 'LIST' }],
    }),

    getRepairCardsForPage: build.query<RepairCardsGetResponse[], void>({
      query: () => ({
        url: 'repair/get/cards',
      }),
    }),

    adminGetRepairCards: build.query<
      { data: RepairCardsGetResponse[]; totalCount: number },
      { search?: string; limit?: number; page?: number; headers: any }
    >({
      query: ({ headers, search, limit = 12, page }) => ({
        url: 'repair/get',
        params: { search, limit, page },
        headers,
      }),
      providesTags: [{ type: 'RepairCards', id: 'LIST_ALL' }],
    }),

    adminUpdateRepairCard: build.mutation<
      { message: string },
      {
        body: Partial<IRepairCardCreate & { id: number; iconPath?: string }>
        headers: any
      }
    >({
      query: ({ body, headers }) => ({
        url: 'repair/update',
        method: 'PATCH',
        body,
        headers,
      }),
    }),

    adminCreateRepairCard: build.mutation<
      { message: string; cardId: number },
      { body: IRepairCardCreate; headers: any }
    >({
      query: ({ body, headers }) => ({
        url: 'repair/create',
        method: 'POST',
        body,
        headers,
      }),
      // invalidatesTags: [{ type: 'RepairCards', id: 'LIST_ALL' }],
    }),
    getRepairCard: build.query<RepairCardResponse, string>({
      query: slug => ({
        url: `repair/card/slug/${slug}`,
      }),
    }),
  }),
})

export const {
  useGetRepairCardQuery,
  useLazyAdminGetRepairCardsQuery,
  useAdminUpdateRepairCardMutation,
  useGetRepairCardsForPageQuery,
  useAdminCreateRepairCardMutation,
  useAdminGetRepairCardDetailsQuery,
  useAdminDeleteRepairCardMutation,
  useGetUsedRepairCardSlugsQuery,
} = repairApi
