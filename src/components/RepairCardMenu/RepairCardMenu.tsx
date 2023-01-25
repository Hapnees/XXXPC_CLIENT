import React, { FC } from 'react'
import { BsGearFill } from 'react-icons/bs'
import cl from './RepairCardMenu.module.scss'

interface IProps {
	title: string
	array: string[]
}

const RepairCardMenu: FC<IProps> = ({ title, array }) => {
	return (
		<div className='px-4 text-[20px]'>
			<p className='mb-2'>{title}</p>

			<ul className={cl.menu}>
				{array.map((el, idx) => (
					<li key={idx}>
						<BsGearFill className='shrink-0 mt-[5px]' />
						<p>{el}</p>
					</li>
				))}
			</ul>
		</div>
	)
}

export default RepairCardMenu
