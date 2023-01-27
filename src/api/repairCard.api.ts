import { RepairCardsGetResponse } from '@interfaces/repair/repair-cards-get.interface'
import { RepairCardResponse } from '../interfaces/repair/repair-card.interface'
import { baseApi } from './baseApi.api'

const baseApiWithTags = baseApi.enhanceEndpoints({
	addTagTypes: ['RepairCards'],
})

const repairApi = baseApiWithTags.injectEndpoints({
	endpoints: build => ({
		getRepairCardsForPage: build.query<RepairCardsGetResponse[], void>({
			query: () => ({
				url: 'repair/get/cards',
			}),
		}),
		getRepairCard: build.query<RepairCardResponse, string>({
			query: slug => ({
				url: `repair/card/slug/${slug}`,
			}),
		}),
	}),
})

export const { useGetRepairCardQuery, useLazyGetRepairCardsForPageQuery } =
	repairApi
