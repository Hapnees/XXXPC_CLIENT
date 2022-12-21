import { IRepairCardMenu } from '@interfaces/adminInterfaces/repair-card-menu.interface'
import { ISerivce } from './service.interface'

export interface RepairCardResponse {
  id: number
  slug: string
  title: string
  createdAt: string
  updatedAt: string
  menus: IRepairCardMenu[]
  services: ISerivce[]
}
