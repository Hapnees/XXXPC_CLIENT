import React, { useLayoutEffect, useRef, useState } from 'react'
import { useGetServicesQuery } from '@api/service.api'
import { useHeaders } from '@hooks/useHeaders'
import { dateFormat } from '@utils/date.format'
import { pricesFormat } from '@utils/prices.format'
import { AdminLoader } from '@components/UI/AdminUi'
import mainCl from '../tabs.module.scss'

const ServiceModel = () => {
  const headers = useHeaders()
  const { data: serviceData, isLoading } = useGetServicesQuery(headers)

  const titleRef = useRef<HTMLLIElement>(null)
  const pricesRef = useRef<HTMLLIElement>(null)
  const updatedAtRef = useRef<HTMLLIElement>(null)
  const createdAtRef = useRef<HTMLLIElement>(null)
  const ordersRef = useRef<HTMLLIElement>(null)

  const [widths, setWidths] = useState({
    title: 0,
    prices: 0,
    updatedAt: 0,
    createdAt: 0,
    orders: 0,
  })

  useLayoutEffect(() => {
    setWidths({
      title: titleRef.current?.offsetWidth || 0,
      prices: pricesRef.current?.offsetWidth || 0,
      updatedAt: updatedAtRef.current?.offsetWidth || 0,
      createdAt: createdAtRef.current?.offsetWidth || 0,
      orders: ordersRef.current?.offsetWidth || 0,
    })
  }, [serviceData])

  return (
    <>
      {isLoading ? (
        <AdminLoader />
      ) : (
        serviceData && (
          <div className={mainCl.wrapper}>
            <div>
              <ul className={mainCl.top__menu}>
                <li>№</li>
                <li ref={titleRef}>Название</li>
                <li ref={pricesRef}>Цены</li>
                <li ref={updatedAtRef}>Дата обновления</li>
                <li ref={createdAtRef}>Дата регистрации</li>
                <li ref={ordersRef}>Заказы</li>
              </ul>
              <ul className={mainCl.content__menu}>
                {serviceData.map(service => (
                  <li key={service.id}>
                    <ul className={mainCl.menu}>
                      <li>{service.id}</li>
                      <li style={{ width: widths.title }}>{service.title}</li>
                      <li style={{ width: widths.prices }}>
                        {pricesFormat(service.prices)}
                      </li>
                      <li style={{ width: widths.updatedAt }}>
                        {dateFormat(service.updatedAt, { withTime: true })}
                      </li>
                      <li style={{ width: widths.createdAt }}>
                        {dateFormat(service.createdAt, { withTime: true })}
                      </li>
                      <li
                        className={mainCl.special}
                        style={{ width: widths.orders }}
                      >
                        <p>{service._count.Order}</p>
                        <p>Заказы</p>
                      </li>
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      )}
    </>
  )
}

export default ServiceModel
