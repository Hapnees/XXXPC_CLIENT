import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SpecialButton from '../UI/SpecialButton/SpecialButton'
import cl from './Header.module.scss'

enum IDs {
	contact = 'contact',
	diagnostic = 'diagnostic',
	repair = 'repair',
}

const Header = () => {
	const location = useLocation()
	const locPath = location.pathname.replace('/', '')
	const navigate = useNavigate()

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

			<div className={cl.menu}>
				<input
					type='radio'
					name='menu'
					id={IDs.contact}
					checked={locPath === IDs.contact}
					onChange={() => onClickMenuItem(IDs.contact)}
				/>
				<label htmlFor='contact'>связаться</label>

				<input
					type='radio'
					name='menu'
					id={IDs.diagnostic}
					checked={locPath === IDs.diagnostic}
					onChange={() => onClickMenuItem(IDs.diagnostic)}
				/>
				<label htmlFor='diagnostic'>диагностика</label>

				<input
					type='radio'
					name='menu'
					id={IDs.repair}
					checked={locPath === IDs.repair}
					onChange={() => onClickMenuItem(IDs.repair)}
				/>

				<label htmlFor='repair'>ремонт</label>

				<SpecialButton>войти</SpecialButton>
			</div>
		</header>
	)
}

export default Header
