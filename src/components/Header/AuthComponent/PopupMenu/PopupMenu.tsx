import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useLogoutMutation } from '../../../../api/auth.api'
import { useActions } from '../../../../hooks/useActions'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import cl from './PopupMenu.module.scss'

interface IProps {
	closePopup: () => void
}

const PopupMenu: FC<IProps> = ({ closePopup }) => {
	const [logout] = useLogoutMutation()
	const { authLogout } = useActions()
	const { accessToken } = useAppSelector(state => state.auth)
	const headers = { authorization: `Bearer ${accessToken}` }

	const onClickLogout = async () => {
		logout(headers).then(() => authLogout())
		closePopup()
	}

	return (
		<ul className={cl.menu}>
			<li onClick={closePopup}>
				<Link to='profile'>
					<p>Профиль</p>
				</Link>
			</li>

			<li onClick={onClickLogout}>Выйти</li>
		</ul>
	)
}

export default PopupMenu
