import React, { FC } from 'react'
import DetailPriceList from '@components/DetailPriceList/DetailPriceList'
import { ISerivce } from '@interfaces/repair/service.interface'
import DetailsLayout from '@layouts/DetailsLayout/DetailsLayout'
import image from '../../../../assets/img/IMAGE_LAPTOP.png'

interface IProps {
  services: ISerivce[]
}

const title = 'Ремонт ноутбуков'
const body = (
  <p>
    Сервисный центр XXXPC осуществляет диагностику, модернизацию и
    профессиональный ремонт ноутбуков, как на компонентном, так и на блочном
    уровне
    <br />
    <br />
    Нашу компанию характеризует высокое качество оказываемых услуг и приемлемые
    сроки выполнения работ по ремонту ноутбуков и любой другой компьютерной
    техники.
    <br />
    <br />
    Мы занимаемся ремонтом и обслуживанием ноутбуков таких производителей как:
    DELL, Acer, Samsung, LG, Prestigio, MSI, Toshiba, Sony, HP, Lenovo, ASUS,
    iRU и многих других
    <br />
    Компания DICOM авторизована на выполнение гарантийного обслуживания и
    постгарантийных ремонтов таких брендов как: DELL, HP, Lenovo, MSI, iRu,
    Prestigio, Digma, Nerpa.
    <br />
    <br />
  </p>
)

const DetailsPageLAPTOP: FC<IProps> = ({ services }) => {
  return (
    <DetailsLayout title={title} body={body} img={image}>
      <DetailPriceList services={services} />
    </DetailsLayout>
  )
}

export default DetailsPageLAPTOP
