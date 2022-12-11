import React from 'react'
import DetailPriceList from '../../../../components/DetailPriceList/DetailPriceList'
import RepairCardMenu from '../../../../components/RepairCardMenu/RepairCardMenu'
import { deffects } from './menus'
import DetailsLayout from '../../../../layouts/DetailsLayout/DetailsLayout'
import { useGetRepairCardQuery } from '../../../../api/repairCard.api'
import { RepairCardSlug } from '../../../../interfaces/repair/repair-valid-params.enum'
import Loader from '../../../../components/UI/Loader/Loader'

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

const DetailsPagePC = () => {
  const { data: repairCard, isLoading } = useGetRepairCardQuery(
    RepairCardSlug.pc
  )

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        repairCard && (
          <DetailsLayout title={title} body={body} img=''>
            <DetailPriceList services={repairCard.services} />

            <RepairCardMenu title={repairCardMenuTitle} array={deffects} />
            <div className='mb-[250px]'></div>
          </DetailsLayout>
        )
      )}
    </>
  )
}

export default DetailsPagePC
