import React, { FC, useState } from 'react'
import {
  OrderStatus,
  OrderStatusView,
} from '@interfaces/adminInterfaces/order-status.enum'
import { IoClose } from 'react-icons/io5'
import cl from './OrderModelCreateWindow.module.scss'
import { OrdersGetResponse } from '@interfaces/adminInterfaces'
import { useOrderUpdateMutation } from '@api/order.api'
import { IOrderUpdate } from '@interfaces/adminInterfaces/order-update.interface'
import { useHeaders } from '@hooks/useHeaders'
import { toast } from 'react-toastify'
import Search from '@components/UI/Search/Search'

const selectData = [
  { value: OrderStatus.PENDING, label: OrderStatusView.PENDING },
  { value: OrderStatus.PROCESSING, label: OrderStatusView.PROCESSING },
  { value: OrderStatus.COMPLETED, label: OrderStatusView.COMPLETED },
  { value: OrderStatus.STOPPED, label: OrderStatusView.STOPPED },
  { value: OrderStatus.REJECTED, label: OrderStatusView.REJECTED },
]

interface IProps {
  order: OrdersGetResponse
  username?: string
  toClose: () => void
}

const OrderModelCreateWindow: FC<IProps> = ({ order, username, toClose }) => {
  const [status, setStatus] = useState<OrderStatus>(order.status as OrderStatus)
  const [updateOrder] = useOrderUpdateMutation()
  const headers = useHeaders()

  const [price, setPrice] = useState(
    order.prices?.length === 1 ? order.prices[0] : ''
  )

  const onClickUpdate = () => {
    const data: IOrderUpdate = {
      id: order.id,
      status,
      prices: [price],
    }

    if (!price) delete data.prices

    updateOrder({ body: data, headers })
      .unwrap()
      .then(response => {
        toast.success(response.message)
        toClose()
      })
  }

  return (
    <div className={cl.wrapper}>
      <IoClose
        className='absolute right-2 top-2 p-1 cursor-pointer'
        size={30}
        onClick={toClose}
      />
      <div className='flex flex-col gap-2 mb-2'>
        <div className={cl.field}>
          <p>Заказ </p>
          <p className='text-[#7DD3FC]'>№ {order.id}</p>
        </div>

        <div className={cl.field}>
          <p>Пользователь</p>
          <p className='text-[#7DD3FC]'>{username || order.User.username}</p>
        </div>

        <div className={cl.field}>
          <p>Услуга</p>
          <p className='text-[#7DD3FC]'>{order.service.title}</p>
        </div>
      </div>

      <div className='flex flex-col items-center gap-4'>
        <select
          className={cl.select}
          value={status}
          onChange={event => setStatus(event.target.value as OrderStatus)}
        >
          {selectData.map((el, idx) => (
            <option key={idx} value={el.value} label={el.label}></option>
          ))}
        </select>

        <input
          type='text'
          placeholder='Цена'
          className={cl.input}
          value={price}
          onChange={event => setPrice(event.target.value)}
        />

        <div className='w-full'>
          <p className={cl.comment__title}>Комментарий</p>
          <p className={cl.comment}>{order.comment}</p>
        </div>
      </div>

      <button className={cl.button} onClick={onClickUpdate}>
        Обновить
      </button>
    </div>
  )
}

export default OrderModelCreateWindow
