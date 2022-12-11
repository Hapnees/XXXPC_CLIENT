import { UsersGetResponse } from './users-get.interface'

export type AdminUsersGetType = Omit<UsersGetResponse, 'hash'>

export type AdminError = {
  status: number
  data: {
    message: string
    error: {
      [key in keyof AdminUsersGetType]: AdminUsersGetType[key]
    }
  }[]
}
