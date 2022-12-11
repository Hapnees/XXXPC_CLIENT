import { RepairCardSlug } from '../repair/repair-valid-params.enum'

export interface RepairCardsGetResponse {
  id: number
  slug: RepairCardSlug
  title: string
  updatedAt: string
  createdAt: string
  _count: {
    services: number
  }
}
