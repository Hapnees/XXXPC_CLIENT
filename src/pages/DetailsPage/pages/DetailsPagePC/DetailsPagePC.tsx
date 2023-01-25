import React, { FC } from 'react'
import DetailPriceList from '@components/DetailPriceList/DetailPriceList'
import RepairCardMenu from '@components/RepairCardMenu/RepairCardMenu'
import DetailsLayout from '@layouts/DetailsLayout/DetailsLayout'
import { deffects } from './menus'
import { ISerivce } from '@interfaces/repair/service.interface'
import img from '@assets/img/images/IMAGE_PC.png'

const title = 'Ремонт компьютеров и их комплектующих'
const body = (
	<p>
		С каждым годом компьютеры все больше и больше проникают в жизнь человека. На
		рынке компьютерной техники появляется больше новинок, компьютеры становятся
		быстрее и сложнее. Именно поэтому ремонт компьютеров находится, сегодня в
		числе самых востребованных услуг.
		<br />
		<br />
		Наши специалисты имею большой опыт работы по ремонту компьютеров, настройке
		компьютеров и ремонту серверов. На складе имеется большое количество
		запасных частей и комплектующих. Это позволяет выполнять ремонт компьютеров
		в короткие сроки и с высоким качеством.&nbsp;
		<span className='text-[#e980d9]'>
			Мы осуществляем ремонт компьютеров любой конфигурации и любых
			производителей
		</span>
	</p>
)

const repairCardMenuTitle = 'Виды неисправностей'

interface IProrps {
	services: ISerivce[]
}

const DetailsPagePC: FC<IProrps> = ({ services }) => {
	return (
		<DetailsLayout title={title} body={body} img={img}>
			<DetailPriceList services={services} />

			<RepairCardMenu title={repairCardMenuTitle} array={deffects} />

			<div className='mt-6 text-[20px]'>
				<p className='mb-4'>
					При обращении в наш сервис, наш инженер производит диагностику
					неисправности. После проведения диагностики, Вам сообщаются причины
					неисправности компьютера, план проведения работ и их стоимость. После
					ремонта компьютера, менеджер должен продемонстрировать Вам его
					работоспособность и выписать гарантийную карту на выполненные услуги
				</p>
				<p>
					Оплата наших услуг производиться только после выполнения услуг и
					выдачи отремонтированного оборудования!
				</p>
			</div>
		</DetailsLayout>
	)
}

export default DetailsPagePC
