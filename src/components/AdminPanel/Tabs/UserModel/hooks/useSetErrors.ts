import {
  AdminError,
  AdminUsersGetType,
} from '@interfaces/adminInterfaces/error.interface'
import { IUserUpdate } from '@interfaces/adminInterfaces/user'
import { useEffect } from 'react'
import { UseFormSetError } from 'react-hook-form'

export const useSetErrors = (
  setError: UseFormSetError<IUserUpdate[]>,
  usersErrors: AdminError[]
) => {
  useEffect(() => {
    if (!usersErrors.length) return

    usersErrors.map(error => {
      error.errors.map(el => {
        const key = el.key as keyof AdminUsersGetType
        setError(`${error.id}.${key}`, { message: 'Неверное значение' })
      })
    })
  }, [usersErrors])
}
