import React, { useEffect } from 'react'
import { useGetOrderByUserQuery } from '../../api/order.api'
import Loader from '../../components/UI/Loader/Loader'
import { useHeaders } from '../../hooks/useHeaders'
import { dateFormat } from '../../utils/date.format'
import cl from './MyOrdersPage.module.scss'

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
                        {order.service.prices.length === 2 ? (
                          <>
                            <p>{order.service.prices[0]}</p>---
                            <p>{order.service.prices[1]}</p>
                          </>
                        ) : (
                          order.service.prices.length === 1 && (
                            <p>{order.service.prices[1]}</p>
                          )
                        )}
                      </div>
                      <p className={cl.status}>{order.status}</p>
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
