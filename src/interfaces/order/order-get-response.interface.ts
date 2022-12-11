export interface OrderGetResponse {
  id: number
  comment: string
  status: string
  createdAt: string
  service: {
    title: string
    prices: string[]
  }
}
