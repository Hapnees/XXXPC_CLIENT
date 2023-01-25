import React, { FC } from 'react'
import DetailsLayout from '@layouts/DetailsLayout/DetailsLayout'
import img from '@assets/img/images/IMAGE_MONITOR.png'
import { ISerivce } from '@interfaces/repair/service.interface'
import DetailPriceList from '@components/DetailPriceList/DetailPriceList'
import RepairCardMenu from '@components/RepairCardMenu/RepairCardMenu'
import { array } from './menu'

const title = 'Ремонт мониторов'
const body = (
	<p>
		Сервис-центр XXXPC уже более десяти лет предоставляет услуги по ремонту
		жидкокристаллических TFT и электронно-лучевых CRT мониторов. Большой опыт
		работы и наличие необходимых деталей на нашем складе позволят нашим
		инженерам в кратчайшие сроки справляться со своими задачами
	</p>
)

interface IProrps {
	services: ISerivce[]
}

const DetailsPageMONITOR: FC<IProrps> = ({ services }) => {
	return (
		<DetailsLayout title={title} body={body} img={img}>
			<DetailPriceList services={services} />

			<ul className='flex flex-col gap-7'>
				{array.map((el, idx) => (
					<li key={idx}>
						<RepairCardMenu title={el.title} array={el.paragraphs} />
					</li>
				))}
			</ul>
		</DetailsLayout>
	)
}

export default DetailsPageMONITOR
