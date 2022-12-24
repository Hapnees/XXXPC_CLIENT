export interface OrdersGetResponse {
  id: number
  comment: string
  status: string
  note: string
  prices: string[]
  updatedAt: string
  createdAt: string
  User: {
    username: string
  }
  service: {
    title: string
  }
}
