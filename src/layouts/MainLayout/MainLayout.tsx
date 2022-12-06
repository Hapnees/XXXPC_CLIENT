import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useRefreshTokensMutation } from '../../api/auth.api'
import Header from '../../components/Header/Header'
import { useActions } from '../../hooks/useActions'
import { useAppSelector } from '../../hooks/useAppSelector'
import cl from './MainLayout.module.scss'

const MainLayout = () => {
	const { setAuth } = useActions()
	const [refreshTokens] = useRefreshTokensMutation()
	const { accessToken, refreshToken } = useAppSelector(state => state.auth)
	const isAuth = !!accessToken
	const headers = { authorization: `Bearer ${refreshToken}` }

	// Обновляем токены при входе на сайт
	useEffect(() => {
		if (!(accessToken && refreshToken)) return

		refreshTokens(headers)
			.unwrap()
			.then(tokens =>
				setAuth({
					accessToken: tokens.accessToken,
					refreshToken: tokens.refreshToken,
				})
			)
	}, [])

	// Обновляем токены каждые 14 минут
	useEffect(() => {
		let interval: any
		if (isAuth) {
			interval = setInterval(() => {
				refreshTokens(headers)
					.unwrap()
					.then(tokens =>
						setAuth({
							accessToken: tokens.accessToken,
							refreshToken: tokens.refreshToken,
						})
					)
			}, 60_000 * 14)
		}

		return () => clearInterval(interval)
	}, [isAuth])

	return (
		<div className={cl.wrapper}>
			<Header />
			<Outlet />
		</div>
	)
}

export default MainLayout
