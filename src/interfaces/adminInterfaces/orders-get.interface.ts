export interface OrdersGetResponse {
  id: number
  comment: string
  status: string
  updatedAt: string
  createdAt: string
  User: {
    username: string
  }
  service: {
    title: string
  }
}
