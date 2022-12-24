import { RepairCardSlug } from './repair-card-slug.enum'

export interface IServiceCreate {
  title: string
  prices: string[]
  repairCardId?: number
  repairCardSlug?: RepairCardSlug
}
