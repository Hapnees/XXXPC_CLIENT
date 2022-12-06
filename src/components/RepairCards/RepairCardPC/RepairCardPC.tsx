import React from 'react'
import { IoDesktop } from 'react-icons/io5'
import RepairCard from '../../RepairCard/RepairCard'
import { deffects, services } from './menus'
import RepairCardMenu from '../../RepairCardMenu/RepairCardMenu'
import { RepairCardSlug } from '../../../interfaces/repair/repair-valid-params.enum'

const topTitle = 'Ремонт компьютеров'
const icon = <IoDesktop size={50} />

const menuTitleDeffects = 'Виды неисправностей:'
const menuTitleServices =
	'Наш сервис-центр выполняет следующие услуги по ремонту компьютеров:'

const RepairCardPC = () => {
	return (
		<RepairCard title={topTitle} topIcon={icon} path={RepairCardSlug.pc}>
			<p className='text-center px-2'>
				Мы осуществляем ремонт компьютеров любой конфигурации и любых
				производителей
			</p>

			<RepairCardMenu title={menuTitleDeffects} array={deffects} />
			<RepairCardMenu title={menuTitleServices} array={services} />
		</RepairCard>
	)
}

export default RepairCardPC
