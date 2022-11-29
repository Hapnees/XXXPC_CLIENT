import React from 'react'
import cl from './RepairPage.module.scss'
import Menu from '../../components/Menu/Menu'
import * as titles from './menuTitles/index'
import * as topIcons from './menuTopIcons/index'

const RepairPage = () => {
	return (
		<div>
			<p className={cl.top__title}>Ремонт компьютерной техники</p>
			<div className={cl.menu__wrapper}>
				<Menu topIcon={topIcons.menuPCTop} titles={titles.menuPC} />
				<Menu
					topIcon={topIcons.menuSmartPhone}
					titles={titles.menuSmartPhone}
				/>
				<Menu topIcon={topIcons.menuPrinter} titles={titles.menuPrinter} />
				<Menu topIcon={topIcons.menuTV} titles={titles.menuTV} />
				<Menu topIcon={topIcons.menuDrive} titles={titles.menuDrive} />
			</div>
		</div>
	)
}

export default RepairPage
