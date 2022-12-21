import { useCallback } from 'react'
import { useLoginMutation } from '../api/auth.api'
import { ILoginForm } from '@components/AuthForms/LoginForm/LoginForm.interface'
import { useActions } from './useActions'

export const useLogin = (closeWindow: () => void) => {
  const [loginUser] = useLoginMutation()
  const { setAuth } = useActions()

  const temp = useCallback((data: ILoginForm) => {
    loginUser(data)
      .unwrap()
      .then(response => {
        setAuth(response)
        closeWindow()
      })
  }, [])

  return temp
}
