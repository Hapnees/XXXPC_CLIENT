import { OrderStatus } from './order-status.enum'

export interface IOrderUpdate {
  id: number
  status?: OrderStatus
  prices?: string[]
}
