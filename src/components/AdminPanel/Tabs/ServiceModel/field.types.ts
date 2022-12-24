export enum EnumServiceModelFields {
  check = 'check',
  id = 'id',
  title = 'title',
  prices = 'prices',
  orders = 'orders',
  updatedAt = 'updatedAt',
  createdAt = 'createdAt',
}

export type ServiceModelWidths = {
  [k in EnumServiceModelFields]: number
}
