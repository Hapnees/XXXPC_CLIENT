import React, { FC, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import avatar from '../../../assets/img/avatar.jpg'
import { usernameFormat } from '../../../utils/username.format'
import cl from './AuthComponent.module.scss'
import PopupMenu from './PopupMenu/PopupMenu'

interface IProps {
	username: string
}

const AuthComponent: FC<IProps> = ({ username }) => {
	const [isOpenPopup, setIsOpenPopup] = useState(false)

	return (
		<div className='relative'>
			<div
				className={cl.container__avatar}
				onClick={() => setIsOpenPopup(!isOpenPopup)}
				style={
					isOpenPopup
						? {
								borderBottomColor: '#c36eb889',
								borderBottomLeftRadius: 0,
								borderBottomRightRadius: 0,
						  }
						: {}
				}
			>
				<img src={avatar} className={cl.avatar} alt='' />
				<p className={cl.title}>{usernameFormat(username)}</p>
			</div>
			<CSSTransition
				in={isOpenPopup}
				timeout={300}
				classNames='popup'
				unmountOnExit
			>
				<PopupMenu closePopup={() => setIsOpenPopup(false)} />
			</CSSTransition>
		</div>
	)
}

export default AuthComponent
