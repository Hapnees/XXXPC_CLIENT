import React, { FC } from 'react'
import { BsFillGearFill } from 'react-icons/bs'
import cl from './Menu.module.scss'

interface IProps {
	topIcon: React.ReactNode
	titles: string[]
}

const Menu: FC<IProps> = ({ titles, topIcon }) => {
	return (
		<div className={cl.wrapper}>
			{topIcon}

			<ul className={cl.menu}>
				{titles.map((title, idx) => (
					<li key={idx}>
						<BsFillGearFill size={16} className='shrink-0' />
						<p>{title}</p>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Menu
