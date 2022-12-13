import { Roles, RolesResponse } from '../interfaces/roles.interface'

export const rolesConvert = (role: RolesResponse | undefined) => {
  const key = Object.keys(RolesResponse)[
    Object.values(RolesResponse).indexOf(role || RolesResponse.VISITOR)
  ] as keyof typeof Roles

  const resultRole = Roles[key]

  return resultRole
}

export const rolesConvertReverse = (role: Roles | undefined) => {
  const key = Object.keys(Roles)[
    Object.values(Roles).indexOf(role || Roles.VISITOR)
  ] as keyof typeof RolesResponse

  const resultRole = RolesResponse[key]

  return resultRole
}
