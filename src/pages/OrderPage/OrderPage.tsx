import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import OrderTextField from '@components/UI/OrderTextField/OrderTextField'
import Loader from '@components/UI/Loader/Loader'
import cl from './OrderPage.module.scss'
import { FiInfo } from 'react-icons/fi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IOrderForm } from '@interfaces/order/order.interface'
import { useCreateOrderMutation } from '@api/order.api'
import { useHeaders } from '@hooks/useHeaders'
import { useGetServiceQuery } from '@api/service.api'
import customToast from '@utils/customToast'

const OrderPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const serviceId = parseInt(params.id ?? '0')
  const { data: serviceData, isLoading } = useGetServiceQuery(serviceId)
  const headers = useHeaders()
  const [createOrder] = useCreateOrderMutation()

  const { register, handleSubmit } = useForm<IOrderForm>()

  const onSubmit: SubmitHandler<IOrderForm> = async data => {
    if (!serviceData) {
      customToast.error('Услуга не найдена')
      return
    }

    data.serviceId = serviceId
    createOrder({ body: data, headers })
      .unwrap()
      .then(response => {
        customToast.success(response.message)
        navigate('/orders')
      })
  }

  return (
    <div className='flex justify-center'>
      {isLoading ? (
        <Loader />
      ) : (
        serviceData && (
          <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
            <ul className={cl.menu}>
              <li>
                <p className={cl.title}>Услуга</p>
                <p className={cl.body}>{serviceData.title}</p>
              </li>
              <li>
                <p className={cl.title}>Стоимость</p>
                {serviceData.prices.length === 2 ? (
                  <p className={cl.body}>
                    от {serviceData.prices[0]} руб до {serviceData.prices[1]}{' '}
                    руб
                  </p>
                ) : (
                  serviceData.prices.length === 1 && (
                    <p className={cl.body}>{serviceData.prices[0]} руб</p>
                  )
                )}
              </li>
            </ul>
            <div className='w-full flex flex-col gap-6 grow'>
              <OrderTextField
                placeholder='Комментарий к заказу'
                {...register('comment')}
              />
              {serviceData.prices.length === 2 && (
                <div className={cl.info}>
                  <FiInfo size={20} />
                  <p>Точная цена будет рассчитана после осмотра</p>
                </div>
              )}
            </div>
            <button className={cl.button}>Заказать</button>
          </form>
        )
      )}
    </div>
  )
}

export default OrderPage
