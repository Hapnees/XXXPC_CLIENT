import React, { FC } from 'react'
import cl from './DetailsLayout.module.scss'

interface IProps {
	img: string
	title: string
	body: string | React.ReactNode
	children?: React.ReactNode
}

const DetailsLayout: FC<IProps> = ({ img, title, body, children }) => {
	return (
		<div className='text-[#ffd2f8] mb-12'>
			<p className={cl.top__title}>{title}</p>

			<div>
				<div className='flex gap-6 mb-12'>
					{/* <img
						src={img}
						alt='Изображение'
						className='w-[250px] h-[300px] object-cover shrink-0'
					/> */}
					<div className='w-[250px] h-[300px] shrink-0 border border-light-green'></div>
					<div className={cl.top__body}>{body}</div>
				</div>
				{children}
			</div>
		</div>
	)
}

export default DetailsLayout
