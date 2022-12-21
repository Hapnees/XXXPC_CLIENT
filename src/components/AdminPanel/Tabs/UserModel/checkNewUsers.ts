import { IUserUpdate } from '@interfaces/adminInterfaces/user-update.interface'
import { rolesConvertReverse } from '@utils/roles.convert'

export const checkNewUsers = (
  correctNewUsersArray: IUserUpdate[],
  changeDataArray: {
    id: number
    changes: IUserUpdate & {
      password?: string | undefined
    }
  }[]
) => {
  if (correctNewUsersArray.length) {
    const correctNewUsers = correctNewUsersArray.map(user => {
      const { roleView, ...correctUser } = user
      const roleNew = rolesConvertReverse(roleView)

      if (!correctUser.phone) delete correctUser.phone
      if (!correctUser.updatedAt) delete correctUser.updatedAt
      if (!correctUser.createdAt) delete correctUser.createdAt

      const result = {
        id: user.id,
        changes: { ...correctUser, role: roleNew },
      }

      return result
    })

    changeDataArray.push(...correctNewUsers)
  }
}
