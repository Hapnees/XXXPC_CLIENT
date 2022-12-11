import { useMemo } from 'react'
import { Roles } from '../interfaces/roles.interface'
import { useAppSelector } from './useAppSelector'

// Авторизован ли пользователь
export const useAuth = (role: Roles = Roles.USER) => {
  const {
    accessToken,
    refreshToken,
    user: { role: userRole },
  } = useAppSelector(state => state.auth)

  const result = useMemo(() => {
    const result = !!(accessToken && refreshToken)
    const isValidRole = userRole !== role || role === Roles.ADMIN

    return result && isValidRole
  }, [accessToken, userRole])

  return result
}
