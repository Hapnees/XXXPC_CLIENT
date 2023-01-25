import React, { FC } from 'react'
import DetailsLayout from '@layouts/DetailsLayout/DetailsLayout'
import img from '@assets/img/images/IMAGE_MONOBLOCK.png'
import { ISerivce } from '@interfaces/repair/service.interface'
import DetailPriceList from '@components/DetailPriceList/DetailPriceList'
import RepairCardMenu from '@components/RepairCardMenu/RepairCardMenu'
import { deffects } from './menu'

const title = 'Ремонт моноблоков'
const body = (
	<>
		<p className='mb-6'>
			Сервисный центр XXXPC выполняет профессиональный ремонт моноблоков в
			Санкт-Петербурге. Также мы предоставляем полный комплекс услуг по
			гарантийному и послегарантийному обслуживанию моноблоков ведущих вендоров
			– Apple, Sony, HP, Lenovo, Dell, Acer, MSI
		</p>
		<p>
			Мы предлагаем полный набор услуг, начиная от диагностики и заканчивая
			ремонтом и заменой комплектующих, чисткой, а также установкой и настройкой
			приложений в моноблоке. Приносите свой моноблок, и мы восстановим его
			работоспособность в предельно короткие сроки. Доверяйте свою технику
			профессионалам. Наши цены приятно удивят вас!
		</p>
	</>
)

const repairCardMenuTitle =
	'Наиболее распространенными признаками выхода из строя моноблока являются:'

interface IProrps {
	services: ISerivce[]
}

const DetailsPageMONOBLOCK: FC<IProrps> = ({ services }) => {
	return (
		<DetailsLayout title={title} body={body} img={img}>
			<DetailPriceList services={services} />

			<RepairCardMenu title={repairCardMenuTitle} array={deffects} />

			<p className='mt-12 text-[20px]'>
				С вышеперечисленными неисправностями наши специалисты чаще всего
				встречаются в ежедневной практике. Диагностировать проблему и пытаться
				решить ее самостоятельно мы не рекомендуем, поскольку моноблок
				представляет собой достаточно сложное устройство. Данное оборудование
				имеет несколько отличное устройство от стандартных рабочих станций и
				ноутбуков, поэтому и заниматься ремонтом моноблоков должны специалисты,
				обладающие особыми знаниями и навыками
			</p>
		</DetailsLayout>
	)
}

export default DetailsPageMONOBLOCK
