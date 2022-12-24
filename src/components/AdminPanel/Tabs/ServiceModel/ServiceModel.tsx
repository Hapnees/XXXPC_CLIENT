import React, { FC, useLayoutEffect, useRef, useState } from 'react'
import {
  useDeleteServicesMutation,
  useGetServicesQuery,
} from '@api/service.api'
import { useHeaders } from '@hooks/useHeaders'
import mainCl from '../tabs.module.scss'
import ServiceModelRow from './ServiceModelRow/ServiceModelRow'
import { toast } from 'react-toastify'
import { AdminLoader } from '@components/UI/AdminUi'
import { ServiceGetResponse } from '@interfaces/adminInterfaces'
import { CreateButton, DeleteButton } from '@components/UI/AdminUi/Buttons'
import BackButton from '@components/UI/AdminUi/Buttons/BackButton/BackButton'
import { CSSTransition } from 'react-transition-group'
import ModalWindow from '@components/UI/ModalWindow/ModalWindow'
import ServiceCreateWindow from './ServiceCreate/ServiceCreateWindow/ServiceCreateWindow'

interface IProps {
  repairCardId?: number
  setCurrentService?: React.Dispatch<
    React.SetStateAction<ServiceGetResponse | undefined>
  >
  toBack?: () => void
}

const ServiceModel: FC<IProps> = ({ repairCardId, toBack }) => {
  const [currentService, setCurrentService] = useState<ServiceGetResponse>()
  const [isViewCreateWindow, setIsViewCreateWindow] = useState(false)

  const headers = useHeaders()
  const { data: serviceData, isLoading } = useGetServicesQuery({
    id: repairCardId,
    headers,
  })

  const [deleteServices] = useDeleteServicesMutation()

  const checkRef = useRef<HTMLLIElement>(null)
  const idRef = useRef<HTMLLIElement>(null)
  const titleRef = useRef<HTMLLIElement>(null)
  const pricesRef = useRef<HTMLLIElement>(null)
  const updatedAtRef = useRef<HTMLLIElement>(null)
  const createdAtRef = useRef<HTMLLIElement>(null)
  const ordersRef = useRef<HTMLLIElement>(null)

  const [checkList, setCheckList] = useState<number[]>([])

  const [widths, setWidths] = useState({
    check: 0,
    id: 0,
    title: 0,
    prices: 0,
    updatedAt: 0,
    createdAt: 0,
    orders: 0,
  })

  useLayoutEffect(() => {
    setWidths({
      check: checkRef.current?.offsetWidth || 0,
      id: idRef.current?.offsetWidth || 0,
      title: titleRef.current?.offsetWidth || 0,
      prices: pricesRef.current?.offsetWidth || 0,
      updatedAt: updatedAtRef.current?.offsetWidth || 0,
      createdAt: createdAtRef.current?.offsetWidth || 0,
      orders: ordersRef.current?.offsetWidth || 0,
    })
  }, [serviceData])

  const onClickDelete = () => {
    deleteServices({ body: checkList, headers })
      .unwrap()
      .then(response => toast.success(response.message))
  }

  return (
    <>
      {isLoading ? (
        <AdminLoader />
      ) : (
        <div>
          <div className='flex gap-2 mb-2 ml-2'>
            <p className='text-[20px]'>Услуги</p>
            {toBack && (
              <BackButton
                onClickBack={() => {
                  toBack()
                }}
              />
            )}
            <CreateButton
              onClickCreate={() => {
                setIsViewCreateWindow(true)
              }}
            />
            <DeleteButton onClickDelete={onClickDelete} />
          </div>
          <div className={mainCl.container__menu}>
            <ul className={mainCl.top__menu}>
              <li ref={checkRef}>C</li>
              <li ref={idRef}>№</li>
              <li ref={titleRef}>Название</li>
              <li ref={pricesRef}>Цены</li>
              <li ref={updatedAtRef}>Дата обновления</li>
              <li ref={createdAtRef}>Дата регистрации</li>
              <li ref={ordersRef}>Заказы</li>
            </ul>
            <ul className={mainCl.content__menu}>
              {serviceData?.map(service => (
                <li
                  key={service.id}
                  onClick={() => {
                    setCurrentService(service)
                    setIsViewCreateWindow(true)
                  }}
                >
                  <ServiceModelRow
                    service={service}
                    widths={widths}
                    checkList={checkList}
                    setCheckList={setCheckList}
                  />
                </li>
              ))}
            </ul>
          </div>
          <CSSTransition
            in={isViewCreateWindow}
            timeout={300}
            classNames='popup'
            unmountOnExit
          >
            <ModalWindow>
              <ServiceCreateWindow
                toClose={() => setIsViewCreateWindow(false)}
                repairCardId={repairCardId}
                currentService={currentService}
                setCurrentService={setCurrentService}
              />
            </ModalWindow>
          </CSSTransition>
        </div>
      )}
    </>
  )
}

export default ServiceModel
