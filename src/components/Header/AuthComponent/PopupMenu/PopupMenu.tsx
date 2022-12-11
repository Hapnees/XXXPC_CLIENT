import React, { FC, forwardRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../../../../api/auth.api'
import { useActions } from '../../../../hooks/useActions'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import cl from './PopupMenu.module.scss'

interface IProps {
  closePopup: () => void
}

const PopupMenu = forwardRef<HTMLUListElement, IProps>(
  ({ closePopup }, ref) => {
    const navigate = useNavigate()
    const [logout] = useLogoutMutation()
    const { authLogout } = useActions()
    const { accessToken } = useAppSelector(state => state.auth)
    const headers = { authorization: `Bearer ${accessToken}` }

    const onClickLogout = async () => {
      logout(headers).then(() => authLogout())
      closePopup()
    }

    const onClickProfile = () => {
      navigate('profile')
      closePopup()
    }

    const onClickOrders = () => {
      navigate('orders')
      closePopup()
    }

    return (
      <ul className={cl.menu} ref={ref}>
        <li onClick={onClickProfile}>
          <p>Профиль</p>
        </li>
        <li onClick={onClickOrders}>
          <Link to='orders'>
            <p>Мои заказы</p>
          </Link>
        </li>

        <li onClick={onClickLogout}>Выйти</li>
      </ul>
    )
  }
)

PopupMenu.displayName = 'PopupMenu'

export default PopupMenu
