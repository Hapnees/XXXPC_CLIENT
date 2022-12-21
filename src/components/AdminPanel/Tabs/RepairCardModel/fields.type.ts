export enum EnumRepairCardModel {
  check = 'check',
  id = 'id',
  icon = 'icon',
  title = 'title',
  slug = 'slug',
  services = 'services',
  updatedAt = 'updatedAt',
  createdAt = 'createdAt',
}

export type TypeRepairCardModel = {
  [k in EnumRepairCardModel]: number
}
