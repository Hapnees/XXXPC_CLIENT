import { RolesResponse } from '../roles.interface'

export interface UsersGetResponse {
  id: number
  role?: RolesResponse
  username: string
  email: string
  hash?: string
  hashedRt: string
  avatarPath: string
  phone?: string
  updatedAt?: string
  createdAt?: string
  _count?: {
    orders: number
  }
}
