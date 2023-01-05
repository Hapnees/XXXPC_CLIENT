import { IUserUpdate, UsersGetResponse } from '@interfaces/adminInterfaces/user'
import { RolesView } from '@interfaces/roles.interface'
import { objectCompare } from '@utils/index'

export const getChanges = (
  dataArray: IUserUpdate[],
  usersData: UsersGetResponse[]
) => {
  const changes: {
    id: number
    changes: IUserUpdate & { password?: string }
  }[] = []
  for (let i = 0; i < dataArray.length; i++) {
    const {
      role: roleOld,
      updatedAt: updatedAtOld,
      createdAt: createdAtOld,
      hash,
      ...oldData
    } = usersData[i]
    const {
      password,
      updatedAt: updatedAtNew,
      createdAt: createdAtNew,
      ...newData
    } = dataArray[i]

    const currentObject = objectCompare(oldData, newData)
    changes.push(currentObject)

    const roleNew = dataArray[i].role
    if (roleNew && roleOld && roleNew !== roleOld) {
      changes[changes.length - 1].changes['role'] = roleNew
    }

    if (password && password !== hash) {
      changes[changes.length - 1].changes['password'] = password
    }
  }
  return changes.filter(el => Object.keys(el.changes).length !== 0)
}
