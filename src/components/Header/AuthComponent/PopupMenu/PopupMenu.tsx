import React from 'react'
import { useLogoutMutation } from '../../../../api/auth.api'
import { useActions } from '../../../../hooks/useActions'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import cl from './PopupMenu.module.scss'

const PopupMenu = () => {
	const [logout] = useLogoutMutation()
	const { authLogout } = useActions()
	const { accessToken } = useAppSelector(state => state.auth)
	const headers = { authorization: `Bearer ${accessToken}` }

	const onClickLogout = async () => {
		logout(headers).then(() => authLogout())
	}

	return (
		<ul className={cl.menu}>
			<li>Профиль</li>
			<li onClick={onClickLogout}>Выйти</li>
		</ul>
	)
}

export default PopupMenu
