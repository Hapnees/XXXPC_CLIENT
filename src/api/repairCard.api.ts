import {
	IRepairCard,
	RepairCardResponse,
} from '../interfaces/repair/repair-card.interface'
import { baseApi } from './baseApi.api'

// TODO: добавить ограничение на роль и сами роли

const repairApi = baseApi.injectEndpoints({
	endpoints: build => ({
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

export const { useGetRepairCardQuery } = repairApi
