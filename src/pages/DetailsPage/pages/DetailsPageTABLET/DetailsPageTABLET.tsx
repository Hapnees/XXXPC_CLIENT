import React, { FC } from 'react'
import DetailPriceList from '@components/DetailPriceList/DetailPriceList'
import { ISerivce } from '@interfaces/repair/service.interface'
import DetailsLayout from '@layouts/DetailsLayout/DetailsLayout'
import RepairCardMenu from '@components/RepairCardMenu/RepairCardMenu'
import { arrayFirst, arraySecond } from './menu'
import img from '@assets/img/images/IMAGE_TABLET.png'

const title = 'Ремонт планшетов'
const body = (
	<>
		<p className='mb-6'>
			Планшет – это удобное портативное устройство, объединяющее в себе
			достоинства целого ряда техники (ноутбук, смартфон, камера и т.д.). Но при
			этом это достаточное нежное изделие, требующее к себе бережного отношения.
			В связи с этим планшеты нередко нуждаются в ремонте
		</p>
		<p>
			Для того чтобы качественно отремонтировать данный девайс необходим
			грамотный и профессиональный подход, специализированное диагностическое
			оборудование, а также особые знания, без которых можно легко сбить
			заводские настройки, повредить крепления и т.д. В отдельных случаях
			самостоятельное вмешательство может вообще поставить крест на вашем
			планшете. Отсюда напрашивается вывод, что проще и дешевле обратиться в
			сервисный центр, чем потом тратиться на новое изделие
		</p>
	</>
)

const repairCardMenuTitleFirst =
	'Механический ремонт включает в себя следующие категории работ:'

const repairCardMenuTitleSecond = 'Программный ремонт:'

interface IProps {
	services: ISerivce[]
}

const DetailsPageTABLET: FC<IProps> = ({ services }) => {
	return (
		<DetailsLayout title={title} body={body} img={img}>
			<DetailPriceList services={services} />

			<div className='text-[20px]'>
				<div className='flex flex-col gap-12 mb-8'>
					<div>
						<RepairCardMenu
							title={repairCardMenuTitleFirst}
							array={arrayFirst}
						/>
						<p className='mt-4 ml-4'>
							Механические повреждения чаще всего возникают в результате
							случайного падения или неаккуратного использования аппарата
						</p>
					</div>

					<div>
						<RepairCardMenu
							title={repairCardMenuTitleSecond}
							array={arraySecond}
						/>
					</div>
				</div>

				<p className='ml-4'>
					У инженеров нашего центра за плечами огромный опыт по ремонту и
					восстановлению работоспособности планшетов, а также других портативных
					устройств. Используя новейшее оборудование и современные технические
					средства, мы в кратчайшие сроки выявим неисправность и устраним ее
					быстро, качественно и с гарантией
				</p>
			</div>
		</DetailsLayout>
	)
}

export default DetailsPageTABLET
