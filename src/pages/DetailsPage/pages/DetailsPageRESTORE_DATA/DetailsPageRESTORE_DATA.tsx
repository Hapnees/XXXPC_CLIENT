import React, { FC } from 'react'
import DetailsLayout from '@layouts/DetailsLayout/DetailsLayout'
import DetailPriceList from '@components/DetailPriceList/DetailPriceList'
import { ISerivce } from '@interfaces/repair/service.interface'
import cl from './DetailsPageRESTORE_DATA.module.scss'
import img from '@assets/img/images/IMAGE_RESTORE_DATA.png'

const title = 'Восстановление данных'
const body = (
	<>
		<p>
			Решив восстановить файлы в компьютерном сервис-центре XXXPC, вы делаете
			правильный выбор. Подразделение нашего сервисного центра - "Центр
			восстановления данных" выполняет услуги по восстановлению данных и ремонту
			жестких дисков с 2000 года. Профессиональное оборудование, большая база
			винчестеров и многолетний опыт позволяют нашим инженерам восстановить
			информацию в самых сложных случаях
		</p>
		<p>Как избежать потери информации?</p>
		<p>
			Единственно надежный способ - правильно организовать архивное копирование
			данных. Этому очевидному совету следуют далеко не все системные
			администраторы, что рано или поздно приводит к плачевному исходу и
			необходимости восстановления данных
		</p>
	</>
)

interface IProrps {
	services: ISerivce[]
}

const DetailsPageRESTORE_DATA: FC<IProrps> = ({ services }) => {
	return (
		<DetailsLayout title={title} body={body} img={img}>
			<DetailPriceList services={services} />

			<div className='mt-[150px]'>
				<p className='text-[22px]'>
					Процесс восстановления данных состоит из 3 этапов:
				</p>
				<ul className={cl.menu}>
					<li>
						<p>I этап - Диагностика</p>
						<p>
							Нашими инженерами проверяется возможность восстановления файлов с
							Вашего носителя и диагностируются все возможные неполадки и
							повреждения. Как правило, этот процесс занимает от 15 минут до 8
							часов. В результатом диагностики определяется: возможность
							восстановления данных, стоимость восстановления данных, примерные
							сроки выполнения работ
						</p>
					</li>
					<li>
						<p>II этап - Восстановление данных</p>
						<p>
							Собственно, сам процесс по копированию и восстановлению файлов и
							другой информации на исправный носитель. Данный этап занимает в
							среднем 2-5 рабочих дней, в "тяжелых" случаях, срок работы может
							быть увеличен до 7-10 дней
						</p>
					</li>
					<li>
						<p>III этап - Проверка и передача данных</p>
						<p>
							После восстановления данных вы можете просмотреть и проверить
							полученную информацию. Только после подтверждения, что
							восстановлено именно то, что вы хотите, мы копируем данные на Ваш
							носитель. Оплата наших услуг по восстановлению данных производится
							только после выполнения работ и проверки полученных данных
						</p>
					</li>
				</ul>
			</div>
		</DetailsLayout>
	)
}

export default DetailsPageRESTORE_DATA
