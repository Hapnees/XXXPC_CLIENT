import React, { useEffect } from 'react'
import { useGetOrderByUserQuery } from '@api/order.api'
import Loader from '@components/UI/Loader/Loader'
import { useHeaders } from '@hooks/index'
import { dateFormat } from '@utils/index'
import cl from './MyOrdersPage.module.scss'
import {
  OrderStatus,
  OrderStatusView,
} from '@interfaces/adminInterfaces/order-status.enum'

const MyOrdersPage = () => {
  const headers = useHeaders()
  const {
    data: orderData,
    isLoading,
    refetch,
  } = useGetOrderByUserQuery(headers)

  useEffect(() => {
    refetch()
  }, [])

  return (
    <div className='flex justify-center'>
      <div>
        <p className={cl.top__title}>Мои заказы</p>

        <div>
          <div className={cl.title__menu}>
            <p className={cl.service}>Услуга</p>
            <p className={cl.price}>Стоимость</p>
            <p className={cl.status}>Статус</p>
            <p className={cl.date}>Дата</p>
            <p className={cl.comment}>Комментарий</p>
            <p className={cl.id}>Идентификатор</p>
          </div>
          {/* MAIN MENU */}
          {isLoading ? (
            <Loader />
          ) : (
            orderData && (
              <ul className={cl.menu}>
                {orderData.map(order => (
                  <li key={order.id}>
                    <div className={cl.service__menu}>
                      <p className={cl.service}>{order.service.title}</p>
                      <div className={cl.price__values}>
                        {order.prices.length === 2 ? (
                          <>
                            <p>{order.prices[0]}</p>---
                            <p>{order.prices[1]}</p>
                          </>
                        ) : (
                          order.prices.length === 1 && <p>{order.prices[0]}</p>
                        )}
                      </div>
                      <p
                        className={cl.status}
                        style={{
                          backgroundColor:
                            order.status === OrderStatus.PENDING
                              ? 'rgba(208, 0, 180, 0.224)'
                              : order.status === OrderStatus.PROCESSING
                              ? 'rgba(160, 0, 208, 0.224)'
                              : order.status === OrderStatus.COMPLETED
                              ? 'rgba(190, 26, 199, 0.403)'
                              : order.status === OrderStatus.STOPPED
                              ? 'rgba(208, 0, 90, 0.224)'
                              : order.status === OrderStatus.REJECTED
                              ? 'rgba(208, 0, 35, 0.432)'
                              : '',
                        }}
                      >
                        {
                          OrderStatusView[
                            order.status as keyof typeof OrderStatusView
                          ]
                        }
                      </p>
                      <p className={cl.date}>{dateFormat(order.createdAt)}</p>
                      <p className={cl.comment}>{order.comment}</p>
                      <p className={cl.id}>{order.id}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default MyOrdersPage
