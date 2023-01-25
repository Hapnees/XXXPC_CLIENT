import { INews } from '@interfaces/news.interface'
import { baseApi } from './baseApi.api'

export const newsApi = baseApi.injectEndpoints({
	endpoints: build => ({
		getNews: build.query<INews[], void>({
			query: () => ({
				url: 'news/get',
			}),
		}),
	}),
})

export const { useGetNewsQuery } = newsApi
