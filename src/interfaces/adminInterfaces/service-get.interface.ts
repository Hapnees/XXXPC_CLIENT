export interface ServiceGetResponse {
  id: number
  title: string
  prices: string[]
  updatedAt: string
  createdAt: string
  _count: {
    Order: number
  }
}
