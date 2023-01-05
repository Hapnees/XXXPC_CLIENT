import React, { FC } from 'react'
import DetailPriceList from '@components/DetailPriceList/DetailPriceList'
import RepairCardMenu from '@components/RepairCardMenu/RepairCardMenu'
import DetailsLayout from '@layouts/DetailsLayout/DetailsLayout'
import { deffects } from './menus'
import { ISerivce } from '@interfaces/repair/service.interface'

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
    <DetailsLayout title={title} body={body} img=''>
      <DetailPriceList services={services} />

      <RepairCardMenu title={repairCardMenuTitle} array={deffects} />
    </DetailsLayout>
  )
}

export default DetailsPagePC
