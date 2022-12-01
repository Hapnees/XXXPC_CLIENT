import React, { useLayoutEffect, useRef, useState } from 'react'
import cl from './RepairPage.module.scss'
import Menu from '../../components/Menu/Menu'
import * as titles from './menuTitles/index'
import * as topIcons from './menuTopIcons/index'
import { HiArrowSmRight } from 'react-icons/hi'
import { HiArrowSmLeft } from 'react-icons/hi'

const RepairPage = () => {
	const [offset, setOffset] = useState(0)
	const refElement = useRef<HTMLDivElement>(null)
	const [widthElement, setWidthElement] = useState(0)

	useLayoutEffect(() => {
		if (refElement.current) setWidthElement(refElement.current.offsetWidth)
	}, [])

	const onClickLeftArrow = () => {
		setOffset(prev => {
			const value = prev + widthElement
			return value > 0 ? -2 * widthElement : value
		})
	}

	const onClickRightArrow = () => {
		setOffset(prev => {
			const value = prev - widthElement
			return Math.abs(value) < widthElement * 3 ? value : 0
		})
	}

	return (
		<div>
			<p className={cl.top__title}>Ремонт компьютерной техники</p>
			<div className={cl.carousel}>
				<div
					className={cl.container}
					style={{
						transform: `translateX(${offset}px)`,
					}}
				>
					<div className={cl.menu__wrapper} ref={refElement}>
						<Menu topIcon={topIcons.menuPCTop} titles={titles.menuPC} />
						<Menu
							topIcon={topIcons.menuSmartPhone}
							titles={titles.menuSmartPhone}
						/>
						<Menu topIcon={topIcons.menuPrinter} titles={titles.menuPrinter} />
						<Menu topIcon={topIcons.menuTV} titles={titles.menuTV} />
						<Menu topIcon={topIcons.menuDrive} titles={titles.menuDrive} />
					</div>

					<div className={cl.menu__wrapper}>
						<Menu topIcon={topIcons.menuPCTop} titles={titles.menuPC} />
						<Menu
							topIcon={topIcons.menuSmartPhone}
							titles={titles.menuSmartPhone}
						/>
						<Menu topIcon={topIcons.menuPrinter} titles={titles.menuPrinter} />
						<Menu topIcon={topIcons.menuPCTop} titles={titles.menuPC} />
						<Menu topIcon={topIcons.menuPCTop} titles={titles.menuPC} />
					</div>

					<div className={cl.menu__wrapper}>
						<Menu topIcon={topIcons.menuPCTop} titles={titles.menuPC} />
						<Menu
							topIcon={topIcons.menuSmartPhone}
							titles={titles.menuSmartPhone}
						/>
						<Menu topIcon={topIcons.menuPrinter} titles={titles.menuPrinter} />
						<Menu topIcon={topIcons.menuPrinter} titles={titles.menuPrinter} />
						<Menu topIcon={topIcons.menuPrinter} titles={titles.menuPrinter} />
					</div>
				</div>
			</div>
			<div className='flex justify-center gap-6 items-center h-[100px]'>
				<HiArrowSmLeft
					size={70}
					className={cl.arrow}
					onClick={onClickLeftArrow}
				/>
				<HiArrowSmRight
					size={70}
					className={cl.arrow}
					onClick={onClickRightArrow}
				/>
			</div>
		</div>
	)
}

export default RepairPage
