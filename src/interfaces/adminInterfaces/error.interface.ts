import { UsersGetResponse } from './users-get.interface'

export type AdminUsersGetType = Omit<UsersGetResponse, 'hash'>

export interface AdminError {
  id: number
  errors: IError[]
}

export interface IError {
  msg: string
  key: string
  value: string
}
