import React from 'react'
import { RiSmartphoneFill } from 'react-icons/ri'
import RepairCard from '../../RepairCard/RepairCard'
import { deffects, services } from './menus'
import RepairCardMenu from '../../RepairCardMenu/RepairCardMenu'
import { RepairCardSlug } from '../../../interfaces/repair/repair-valid-params.enum'

const topTitle = 'Ремонт смартфонов'
const icon = <RiSmartphoneFill size={50} />

const menuTitleDeffects = 'Виды неисправностей:'
const menuTitleServices =
	'Наш сервис-центр выполняет следующие услуги по ремонту смартфонов'

const RepairCardPhoneAndroid = () => {
	return (
		<RepairCard title={topTitle} topIcon={icon} path={RepairCardSlug.pc}>
			<p className='text-center px-2'>
				Мы осуществляем ремонт Android смартфонов
			</p>

			<RepairCardMenu title={menuTitleDeffects} array={deffects} />
			<RepairCardMenu title={menuTitleServices} array={services} />
		</RepairCard>
	)
}

export default RepairCardPhoneAndroid
