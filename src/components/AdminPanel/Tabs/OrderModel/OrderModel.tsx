import React, { useLayoutEffect, useRef, useState } from 'react'
import { useGetOrdersQuery } from '@api/order.api'
import { useHeaders } from '@hooks/useHeaders'
import { dateFormat } from '@utils/date.format'
import { AdminLoader } from '@components/UI/AdminUi/index'
import mainCl from '../tabs.module.scss'

const OrderModel = () => {
  const headers = useHeaders()
  const { data: ordersData, isLoading } = useGetOrdersQuery(headers)

  const commentRef = useRef<HTMLLIElement>(null)
  const statusRef = useRef<HTMLLIElement>(null)
  const updatedAtRef = useRef<HTMLLIElement>(null)
  const createdAtRef = useRef<HTMLLIElement>(null)
  const usernameRef = useRef<HTMLLIElement>(null)
  const serviceTitleRef = useRef<HTMLLIElement>(null)

  const [widths, setWidths] = useState({
    comment: 0,
    status: 0,
    updatedAt: 0,
    createdAt: 0,
    usrename: 0,
    serviceTitle: 0,
  })

  useLayoutEffect(() => {
    setWidths({
      comment: commentRef.current?.offsetWidth || 0,
      status: statusRef.current?.offsetWidth || 0,
      updatedAt: updatedAtRef.current?.offsetWidth || 0,
      createdAt: createdAtRef.current?.offsetWidth || 0,
      usrename: usernameRef.current?.offsetWidth || 0,
      serviceTitle: serviceTitleRef.current?.offsetWidth || 0,
    })
  }, [ordersData])

  return (
    <>
      {isLoading ? (
        <AdminLoader />
      ) : (
        ordersData && (
          <div className={mainCl.wrapper}>
            <div>
              <ul className={mainCl.top__menu}>
                <li>№</li>
                <li ref={commentRef}>Комментарий</li>
                <li ref={statusRef}>Статус</li>
                <li ref={updatedAtRef}>Дата обновления</li>
                <li ref={createdAtRef}>Дата регистрации</li>
                <li ref={usernameRef}>Имя заказчика</li>
                <li ref={serviceTitleRef}>Название услуги</li>
              </ul>
              <ul className={mainCl.content__menu}>
                {ordersData.map(order => (
                  <li key={order.id}>
                    <ul className={mainCl.menu}>
                      <li>{order.id}</li>
                      <li style={{ width: widths.comment }}>{order.comment}</li>
                      <li style={{ width: widths.status }}>{order.status}</li>
                      <li style={{ width: widths.updatedAt }}>
                        {dateFormat(order.updatedAt, { withTime: true })}
                      </li>
                      <li style={{ width: widths.createdAt }}>
                        {dateFormat(order.createdAt, { withTime: true })}
                      </li>
                      <li style={{ width: widths.usrename }}>
                        {order.User.username}
                      </li>
                      <li style={{ width: widths.serviceTitle }}>
                        {order.service.title}
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
export default OrderModel
