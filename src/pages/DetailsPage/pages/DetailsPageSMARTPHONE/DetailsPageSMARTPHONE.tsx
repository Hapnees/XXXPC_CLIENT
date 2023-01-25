import React, { FC } from 'react'
import DetailsLayout from '@layouts/DetailsLayout/DetailsLayout'
import { ISerivce } from '@interfaces/repair/service.interface'
import DetailPriceList from '@components/DetailPriceList/DetailPriceList'
import RepairCardMenu from '@components/RepairCardMenu/RepairCardMenu'
import { deffects } from './menu'
import img from '@assets/img/images/IMAGE_SMARTPHONE.png'

const title = 'Ремонт смартфонов'
const body = (
	<p>
		Сотрудники сервис-центра XXXPC предоставляют услугу - ремонт смартфонов
		<br />
		<br />
		<p>
			Если вы уронили смартфон, разбили стекло и вам необходим ремонт экрана
			смартфона - смело звоните нам, наши специалисты сделают все быстро,
			качественно и недорого. Сегодня смартфоны являются самым популярным
			классом мобильных устройств, открывающих перед владельцем широкие
			возможности (звонки, фото, видео, игры, музыка, интернет и т.д.). Не
			удивительно, что каждый пользователь выбирает модель c как можно большим
			функционалом и тонким корпусом. Однако внушительный набор опций не всегда
			безболезненно сочетается с компактными габаритами девайса. Такие
			портативные устройства сильно подвержены возникновению неисправностей,
			причиной которых не всегда является сам пользователь.
		</p>
	</p>
)

interface IProps {
	services: ISerivce[]
}

const repairCardMenuTitle = 'Виды неисправностей'

const DetailsPageSMARTPHONE: FC<IProps> = ({ services }) => {
	return (
		<DetailsLayout title={title} body={body} img={img}>
			<DetailPriceList services={services} />

			<RepairCardMenu title={repairCardMenuTitle} array={deffects} />

			<p className='mt-4 text-[20px]'>
				После выполнения диагностики вы получаете полную информации об
				устройстве – причину, характер поломки, а также стоимость ремонта. Мы
				восстанавливаем смартфоны в кратчайшие сроки. Этому способствует высокий
				уровень профессионализма наших сотрудников, а также собственная база
				оригинальных запчастей. Высокое качество ремонтных работ и гарантия на
				все устанавливаемые комплектующие – это все характеризует СЦ «Диком» как
				надежного ответственного поставщика услуг по ремонту и обcлуживанию
				мобильных устройств.
			</p>
		</DetailsLayout>
	)
}

export default DetailsPageSMARTPHONE
