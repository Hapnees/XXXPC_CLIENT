import { OrdersGetResponse } from '@interfaces/adminInterfaces'
import {
  OrderStatus,
  OrderStatusView,
} from '@interfaces/adminInterfaces/order-status.enum'
import { dateFormat } from '@utils/date.format'
import React, { FC } from 'react'
import mainCl from '../../tabs.module.scss'
import { TypeOrderModel } from '../fields.type'

// TODO: НУЖЕН РЕФАКТОРИНГ!

interface IProps {
  widths: TypeOrderModel
  order: OrdersGetResponse
  userId?: number
  setCheckList: React.Dispatch<React.SetStateAction<number[]>>
  checkList: number[]
}

const OrderModelRow: FC<IProps> = ({
  widths,
  order,
  userId,
  checkList,
  setCheckList,
}) => {
  const value = checkList.includes(order.id)

  const onChangeCheck = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    event.stopPropagation()
    if (value) {
      const newCheckList = [...checkList].filter(el => el !== order.id)
      setCheckList(newCheckList)
      return
    }
    setCheckList(prev => [...prev, order.id])
  }

  return (
    <ul
      className={mainCl.menu__without__inputs}
      style={{
        backgroundColor: value ? 'rgba(177, 39, 39, 0.505)' : '',
      }}
    >
      <li
        style={{ width: widths.check }}
        className={mainCl.not_input}
        onClick={event => onChangeCheck(event)}
      >
        <input
          type='checkbox'
          className={mainCl.checkbox}
          checked={value}
          onChange={event => onChangeCheck(event)}
        />
      </li>
      <li style={{ width: widths.id }}>
        <p>{order.id}</p>
      </li>
      <li style={{ width: widths.comment }}>
        <p className='w-[180px] overflow-hidden text-ellipsis'>
          {order.comment}
        </p>
      </li>
      <li
        style={{
          width: widths.status,
          backgroundColor:
            order.status === OrderStatus.PENDING
              ? 'rgba(159, 149, 1, 0.706)'
              : order.status === OrderStatus.PROCESSING
              ? 'rgba(168, 222, 18, 0.501)'
              : order.status === OrderStatus.COMPLETED
              ? 'rgba(63, 205, 50, 0.615)'
              : order.status === OrderStatus.STOPPED
              ? 'rgba(50, 197, 205, 0.615)'
              : order.status === OrderStatus.REJECTED
              ? 'rgba(205, 50, 50, 0.615)'
              : '',
        }}
      >
        <p>{OrderStatusView[order.status as keyof typeof OrderStatusView]}</p>
      </li>
      <li style={{ width: widths.prices }}>
        <p className='flex gap-2 w-[180px] overflow-hidden text-ellipsis'>
          {order.prices.length === 2 ? (
            <>
              <p>{order.prices[0]}</p>---
              <p>{order.prices[1]}</p>
            </>
          ) : (
            order.prices.length === 1 && <p>{order.prices[0]}</p>
          )}
        </p>
      </li>
      <li style={{ width: widths.updatedAt }}>
        <p>{dateFormat(order.updatedAt, { withTime: true })}</p>
      </li>
      <li style={{ width: widths.createdAt }}>
        <p>{dateFormat(order.createdAt, { withTime: true })}</p>
      </li>
      {!userId && (
        <li style={{ width: widths.username }}>
          <p>{order.User.username}</p>
        </li>
      )}
      <li style={{ width: widths.serviceTitle }}>
        <p className='w-[180px] overflow-hidden text-ellipsis'>
          {order.service.title}
        </p>
      </li>
    </ul>
  )
}

export default OrderModelRow
