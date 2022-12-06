import React from 'react'
import RepairCard from '../../RepairCard/RepairCard'
import { BsFillLaptopFill } from 'react-icons/bs'
import { services } from './menus'
import RepairCardMenu from '../../RepairCardMenu/RepairCardMenu'
import { RepairCardSlug } from '../../../interfaces/repair/repair-valid-params.enum'

const topTitle = 'Ремонт ноутбуков'
const icon = <BsFillLaptopFill size={50} />

const menuTitle =
	'Наш сервис-центр выполняет следующие услуги по ремонту ноутбуков:'

const RepairCardLaptop = () => {
	return (
		<RepairCard title={topTitle} topIcon={icon} path={RepairCardSlug.laptop}>
			<p className='text-center px-2'>
				Мы осуществляем ремонт ноутбуков большинства популярных производителей
			</p>

			<RepairCardMenu title={menuTitle} array={services} />
		</RepairCard>
	)
}

export default RepairCardLaptop
