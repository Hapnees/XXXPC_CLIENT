import { Roles } from '../roles.interface'
import { UsersGetResponse } from './users-get.interface'

export interface IUserUpdate {
  id: number
  role?: Roles
  username: string
  email: string
  password?: string
  hashedRt: string
  avatarPath: string
  phone: string
  updatedAt?: string
  createdAt?: string
}

export interface UserUpdateRequest {
  data: { id: number; changes: UsersGetResponse & { password?: string } }[]
}
