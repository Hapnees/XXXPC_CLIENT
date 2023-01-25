import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@components/Header/Header'
import { useRefreshTokens } from '@hooks/useRefreshTokens'
import cl from './MainLayout.module.scss'

const MainLayout = () => {
	// Обновляем токены
	useRefreshTokens()

	return (
		<div className={cl.wrapper}>
			<Header />
			<Outlet />
		</div>
	)
}

export default MainLayout
