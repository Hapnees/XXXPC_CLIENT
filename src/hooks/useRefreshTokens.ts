import { useEffect } from 'react'
import { useRefreshTokensMutation } from '../api/auth.api'
import { useActions, useHeaders, useAuth, useAppSelector } from '@hooks/index'

export const useRefreshTokens = () => {
  const { setAuth } = useActions()
  const [refreshTokens] = useRefreshTokensMutation()
  const { refreshToken } = useAppSelector(state => state.auth)
  const headers = useHeaders(refreshToken)
  const isAuth = useAuth()

  // Обновляем токены при входе на сайт
  useEffect(() => {
    if (!isAuth) return

    refreshTokens(headers)
      .unwrap()
      .then(response =>
        setAuth({
          accessToken: response.tokens.accessToken,
          refreshToken: response.tokens.refreshToken,
          user: { role: response.role },
        })
      )
  }, [])

  // Обновляем токены каждые 14 минут
  useEffect(() => {
    if (!isAuth) return
    const interval = setInterval(() => {
      refreshTokens(headers)
        .unwrap()
        .then(response => {
          console.log('REFRESH TOKENS')
          setAuth({
            accessToken: response.tokens.accessToken,
            refreshToken: response.tokens.refreshToken,
            user: { role: response.role },
          })
        })
    }, 60_000 * 15)

    return () => clearInterval(interval)
  }, [isAuth])
}
