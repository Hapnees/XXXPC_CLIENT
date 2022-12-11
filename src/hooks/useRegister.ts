import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../api/auth.api'
import { useActions } from './useActions'

// Регистрация пользователя
export const useRegister = (headers: any) => {
  const navite = useNavigate()
  const [registerUser, { isLoading }] = useRegisterMutation()
  const { setAuth } = useActions()

  useEffect(() => {
    let timer: any
    registerUser(headers)
      .unwrap()
      .then(response => {
        toast.success('Вы успешно зарегестрировались')
        setAuth(response)
        timer = setTimeout(() => {
          navite('/')
        }, 3000)
      })

    return () => clearTimeout(timer)
  }, [])

  return { isLoading }
}
