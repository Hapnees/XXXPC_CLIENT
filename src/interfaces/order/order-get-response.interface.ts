export interface OrderGetResponse {
  id: number
  comment: string
  status: string
  prices: string[]
  createdAt: string
  service: {
    title: string
  }
}
