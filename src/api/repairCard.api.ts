import { IRepairCardCreate } from '@interfaces/adminInterfaces/repair-card-create.interface'
import { RepairCardSlug } from '@interfaces/adminInterfaces/repair-card-slug.enum'
import { RepairCardsGetResponse } from '@interfaces/adminInterfaces/repair-cards-get.interface'
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

    adminGetRepairCards: build.query<RepairCardsGetResponse[], any>({
      query: headers => ({
        url: 'repair/get',
        headers,
      }),
      providesTags: [{ type: 'RepairCards', id: 'LIST_ALL' }],
    }),

    adminUpdateRepairCard: build.mutation<
      { message: string },
      { body: Partial<IRepairCardCreate & { id: number }>; headers: any }
    >({
      query: ({ body, headers }) => ({
        url: 'repair/update',
        method: 'PATCH',
        body,
        headers,
      }),
      // invalidatesTags: [{ type: 'RepairCards', id: 'LIST' }],
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
      // invalidatesTags: [{ type: 'RepairCards', id: 'LIST' }],
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
  useAdminGetRepairCardsQuery,
  useAdminUpdateRepairCardMutation,
  useGetRepairCardsForPageQuery,
  useAdminCreateRepairCardMutation,
  useAdminGetRepairCardDetailsQuery,
  useAdminDeleteRepairCardMutation,
  useGetUsedRepairCardSlugsQuery,
} = repairApi
