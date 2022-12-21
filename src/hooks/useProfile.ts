import { useEffect, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { useLazyGetProfileQuery } from '@api/user.api'
import { IUserProfile, IUserUpdate } from '../interfaces/user/index'
import { useHeaders } from './useHeaders'

// Получаем данные о пользователе и заполняем ими поля при загрузке страницы
export const useProfle = (setValue: UseFormSetValue<IUserUpdate>) => {
  const headers = useHeaders()
  const [data, setData] = useState<IUserProfile>()
  const [getProfile, { isLoading }] = useLazyGetProfileQuery()

  useEffect(() => {
    getProfile(headers)
      .unwrap()
      .then(userData => {
        setValue('username', userData?.username)
        setValue('email', userData?.email)
        setValue('phone', userData?.phone || '')
        setData(userData)
      })
  }, [])

  return { data, isLoading }
}
