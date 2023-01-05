import { Roles, RolesView } from '../../roles.interface'
import { UsersGetResponse } from './users-get.interface'

export interface IUserUpdate {
  id: number
  role?: Roles
  roleView?: RolesView
  username: string
  email: string
  password?: string
  isOnline: boolean
  avatarPath: string
  phone?: string
  updatedAt?: string
  createdAt?: string
}

export interface UserUpdateRequest {
  data: { id: number; changes: UsersGetResponse & { password?: string } }[]
}
