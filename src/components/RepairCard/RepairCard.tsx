import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import cl from './RepairCard.module.scss'

interface IProps {
	topIcon: React.ReactNode
	title: string
	children: React.ReactNode
	path: string
}

const RepairCard: FC<IProps> = ({ topIcon, title, children, path }) => {
	return (
		<>
			<div className={cl.card__top__content}>
				{topIcon}
				<p>{title}</p>
			</div>

			<div className='flex flex-col gap-4 mb-6 grow'>{children}</div>

			<Link to={path}>
				<button className={cl.button}>Подробнее</button>
			</Link>
		</>
	)
}

export default RepairCard
