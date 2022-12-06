import React from 'react'
import { RiDeviceRecoverFill } from 'react-icons/ri'
import RepairCard from '../../RepairCard/RepairCard'
import { services } from './menus'
import RepairCardMenu from '../../RepairCardMenu/RepairCardMenu'
import { RepairCardSlug } from '../../../interfaces/repair/repair-valid-params.enum'

const topTitle = 'Восстановление данных'
const icon = <RiDeviceRecoverFill size={50} />

const menuTitleServices =
	'Наш сервис-центр выполняет следующие услуги по восстановлению данных'

const RepairCardRestoreData = () => {
	return (
		<RepairCard title={topTitle} topIcon={icon} path={RepairCardSlug.pc}>
			<p className='text-center px-2'>
				Решив восстановить файлы в компьютерном сервис-центре XXXPC, вы делаете
				правильный выбор
			</p>

			<RepairCardMenu title={menuTitleServices} array={services} />
		</RepairCard>
	)
}

export default RepairCardRestoreData
