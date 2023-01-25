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
		<div className={cl.wrapper}>
			<p className={cl.top__title}>{title}</p>

			<div>
				<div className='flex gap-6 mb-12'>
					<div className='flex gap-6 items-center'>
						<img src={img} alt='Изображение' className={cl.img} />
						<div className={cl.top__body}>{body}</div>
					</div>
				</div>
				{children}
			</div>
		</div>
	)
}

export default DetailsLayout
