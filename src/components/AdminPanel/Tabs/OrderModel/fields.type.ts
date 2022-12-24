export enum EnumOrderModel {
  check = 'check',
  id = 'id',
  comment = 'comment',
  status = 'status',
  username = 'username',
  prices = 'prices',
  serviceTitle = 'serviceTitle',
  updatedAt = 'updatedAt',
  createdAt = 'createdAt',
}

export type TypeOrderModel = {
  [k in EnumOrderModel]: number
}
