import { ISerivce } from './service.interface'

export interface RepairCardResponse {
	id: number
	slug: string
	title: string
	createdAt: string
	updatedAt: string

	services: ISerivce[]
}

export interface IRepairCard {
	title: string
}
