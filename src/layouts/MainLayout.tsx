import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import cl from './MainLayout.module.scss'

const MainLayout = () => {
	return (
		<div className={cl.wrapper}>
			<Header />
			<Outlet />
		</div>
	)
}

export default MainLayout
