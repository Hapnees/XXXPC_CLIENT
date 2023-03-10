import { useEffect } from 'react'
import { useRefreshTokensMutation } from '../api/auth.api'
import { useActions, useAuth, useAppSelector, useHeaders } from '@hooks/index'
import { useUpdateOnlineMutation } from '@api/user.api'

export const useRefreshTokens = () => {
	const { setAuth } = useActions()
	const [refreshTokens] = useRefreshTokensMutation()
	const { refreshToken, isNeededRefresh } = useAppSelector(state => state.auth)
	const headersRefresh = useHeaders(refreshToken)
	const headersAccess = useHeaders()
	const isAuth = useAuth()
	const [updateOnline] = useUpdateOnlineMutation()

	const handler = (event: BeforeUnloadEvent) => {
		event.preventDefault()
		updateOnline({ isOnline: false, headers: headersAccess })
	}

	// Обновляем токены при входе на сайт
	useEffect(() => {
		if (!isAuth) return

		// authSetIsNeeded(true)
		refreshTokens(headersRefresh)
			.unwrap()
			.then(response => {
				window.addEventListener('beforeunload', handler)
				setAuth({
					accessToken: response.tokens.accessToken,
					refreshToken: response.tokens.refreshToken,
					user: { role: response.role },
				})
			})

		return () => window.removeEventListener('beforeunload', handler)
	}, [])

	useEffect(() => {
		if (isNeededRefresh) return

		updateOnline({ isOnline: true, headers: headersAccess })
	}, [isNeededRefresh])

	// Обновляем токены каждые 14 минут
	useEffect(() => {
		if (!isAuth) return
		const interval = setInterval(() => {
			refreshTokens(headersRefresh)
				.unwrap()
				.then(response => {
					setAuth({
						accessToken: response.tokens.accessToken,
						refreshToken: response.tokens.refreshToken,
						user: { role: response.role },
					})
				})
		}, 60_000 * 14)

		return () => clearInterval(interval)
	}, [isAuth])
}
