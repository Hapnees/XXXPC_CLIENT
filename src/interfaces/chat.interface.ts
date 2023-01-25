import { Roles } from './roles.interface'

export interface IChat {
	id: number
	status: ChatStatus
	masterName: string
	Message: {
		id: number
		text: string
		createdAt: string
		user: { role: Roles }
	}[]
}

export enum ChatStatus {
	PENDING = 'PENDING',
	ACCEPTED = 'ACCEPTED',
}
