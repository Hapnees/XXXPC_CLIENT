import { IUploadImage } from '../interfaces/upload-image.interface'
import { baseApi } from './baseApi.api'

export const mediaApi = baseApi.injectEndpoints({
	endpoints: build => ({
		uploadImage: build.mutation<
			{ url: string },
			{ data: IUploadImage; headers: any }
		>({
			query: ({ data: { image, userId, folder }, headers }) => ({
				url: 'media/upload/image',
				method: 'POST',
				params: {
					userId,
					folder,
				},
				headers,
				body: image,
			}),
		}),
	}),
})

export const { useUploadImageMutation } = mediaApi
