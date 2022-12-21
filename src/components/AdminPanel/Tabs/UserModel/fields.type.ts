export enum EnumUserModelFields {
  check = 'check',
  id = 'id',
  username = 'username',
  email = 'email',
  role = 'role',
  hash = 'hash',
  hashedRt = 'hashedRt',
  avatarPath = 'avatarPath',
  phone = 'phone',
  orders = 'orders',
  updatedAt = 'updatedAt',
  createdAt = 'createdAt',
}

export type UserModelWidths = {
  [k in EnumUserModelFields]: number
}
