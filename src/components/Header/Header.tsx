import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { useRefreshTokensMutation } from '../../api/auth.api'
import { useActions } from '../../hooks/useActions'
import { useAppSelector } from '../../hooks/useAppSelector'
import AuthForm from '../AuthForms/AuthForm'
import SpecialButton from '../UI/SpecialButton/SpecialButton'
import AuthComponent from './AuthComponent/AuthComponent'
import cl from './Header.module.scss'

enum IDs {
	contact = 'contact',
	general = '/',
	repair = 'repair',
}

const Header = () => {
	const { setAuth } = useActions()
	const [refreshTokens] = useRefreshTokensMutation()
	const [isAuthOpen, setIsAuthOpen] = useState(false)
	const location = useLocation()
	const locPath = location.pathname.replace('/', '')
	const navigate = useNavigate()
	const {
		accessToken,
		refreshToken,
		user: { username },
	} = useAppSelector(state => state.auth)
	const isAuth = !!accessToken
	const headers = { authorization: `Bearer ${refreshToken}` }

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

	const onClickMenuItem = (id: string) => {
		navigate(id)
	}

	return (
		<header className='flex justify-between px-[175px] items-center'>
			<div>
				<Link to='/'>
					<p className={cl.logo}>
						<span className='text-[#E3ABDC]'>XXX</span>PC
					</p>
				</Link>
			</div>

			<div className='relative'>
				<div className={cl.menu}>
					<input
						type='radio'
						name='menu'
						id={IDs.general}
						checked={locPath === ''}
						onChange={() => onClickMenuItem(IDs.general)}
					/>

					<label htmlFor={IDs.general}>Главная</label>

					<input
						type='radio'
						name='menu'
						id={IDs.contact}
						checked={locPath === IDs.contact}
						onChange={() => onClickMenuItem(IDs.contact)}
					/>
					<label htmlFor='contact'>связаться</label>

					{/* <input
						type='radio'
						name='menu'
						id={IDs.diagnostic}
						checked={locPath === IDs.diagnostic}
						onChange={() => onClickMenuItem(IDs.diagnostic)}
					/>
					<label htmlFor='diagnostic'>диагностика</label> */}

					<input
						type='radio'
						name='menu'
						id={IDs.repair}
						checked={locPath === IDs.repair}
						onChange={() => onClickMenuItem(IDs.repair)}
					/>

					<label htmlFor={IDs.repair}>ремонт и диагностика</label>

					{isAuth ? (
						<AuthComponent username={username} />
					) : (
						<SpecialButton
							onClick={() => setIsAuthOpen(!isAuthOpen)}
							isAuthOpen={isAuthOpen}
						>
							войти
						</SpecialButton>
					)}
				</div>
				{!isAuth && (
					<CSSTransition
						in={isAuthOpen}
						timeout={300}
						classNames='alert'
						unmountOnExit
					>
						<AuthForm closeWindow={() => setIsAuthOpen(false)} />
					</CSSTransition>
				)}
			</div>
		</header>
	)
}

export default Header
