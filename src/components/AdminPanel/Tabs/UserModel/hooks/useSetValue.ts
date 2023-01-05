import { IUserUpdate, UsersGetResponse } from '@interfaces/adminInterfaces/user'
import { UseFormSetValue } from 'react-hook-form'
import { useEffect } from 'react'
import { dateFormat } from '@utils/index'
import { RolesView } from '@interfaces/roles.interface'

export const useSetValue = (
  setValue: UseFormSetValue<IUserUpdate[]>,
  usersData: UsersGetResponse[] | undefined
) => {
  useEffect(() => {
    usersData?.forEach(el => {
      setValue(`${el.id}.id`, el.id)
      setValue(`${el.id}.username`, el.username)
      setValue(`${el.id}.email`, el.email)
      setValue(
        `${el.id}.roleView`,
        RolesView[el.role as keyof typeof RolesView]
      )
      setValue(`${el.id}.password`, el.hash)
      setValue(`${el.id}.isOnline`, el.isOnline)
      setValue(`${el.id}.avatarPath`, el.avatarPath)
      setValue(`${el.id}.phone`, el.phone)
      setValue(
        `${el.id}.updatedAt`,
        dateFormat(el.updatedAt, { withTime: true })
      )
      setValue(
        `${el.id}.createdAt`,
        dateFormat(el.createdAt, { withTime: true })
      )
    })
  }, [usersData])
}
