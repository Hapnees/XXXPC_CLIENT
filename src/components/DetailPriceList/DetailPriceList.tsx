import React, { FC, useState } from 'react'
import { IoIosArrowDropdown } from 'react-icons/io'
import { CSSTransition } from 'react-transition-group'
import { ISerivce } from '../../interfaces/repair/service.interface'
import cl from './DetailPriceList.module.scss'

interface IProps {
	services: ISerivce[]
}

const DetailPriceList: FC<IProps> = ({ services }) => {
	const [isOpenPopup, setIsOpenPopup] = useState(false)
	const rotate = isOpenPopup ? 180 : 0
	const borderRadius = isOpenPopup ? 0 : '6px'

	const onClickOrder = () => {}

	return (
		<div
			className={cl.price__wrapper}
			style={{
				height: isOpenPopup ? `${services.length * 55 + 100}px` : '70px',
			}}
		>
			<div
				className={cl.price__container}
				style={{
					borderBottomLeftRadius: borderRadius,
					borderBottomRightRadius: borderRadius,
				}}
			>
				<p>Прайс лист услуг</p>

				<IoIosArrowDropdown
					size={55}
					className={cl.icon}
					onClick={() => setIsOpenPopup(!isOpenPopup)}
					style={{
						transform: `rotate(${rotate}deg)`,
					}}
				/>
			</div>
			<CSSTransition
				in={isOpenPopup}
				timeout={300}
				classNames='details'
				unmountOnExit
			>
				<div className='text-[20px]'>
					<div className={cl.menu__title}>
						<p>Услуга</p>
						<div className=''>
							<p>От:</p>
							<p>До:</p>
						</div>
					</div>
					<ul className={cl.menu}>
						{services.map((el, idx) => (
							<li key={idx}>
								<p>{el.title}</p>
								<div className='flex gap-[20px] pr-[20px]'>
									<div className={cl.prices__container}>
										{el.prices.map((el, idx) => (
											<p key={idx}>{el}</p>
										))}
									</div>
									<button className={cl.button}>Заказать</button>
								</div>
							</li>
						))}
					</ul>
				</div>
			</CSSTransition>
		</div>
	)
}

export default DetailPriceList
