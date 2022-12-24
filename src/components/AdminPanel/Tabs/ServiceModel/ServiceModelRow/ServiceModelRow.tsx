import { ServiceGetResponse } from '@interfaces/adminInterfaces'
import { dateFormat } from '@utils/date.format'
import { pricesFormat } from '@utils/prices.format'
import React, { FC } from 'react'
import mainCl from '../../tabs.module.scss'
import { ServiceModelWidths } from '../field.types'

interface IProps {
  widths: ServiceModelWidths
  service: ServiceGetResponse
  setCheckList: React.Dispatch<React.SetStateAction<number[]>>
  checkList: number[]
}

const ServiceModelRow: FC<IProps> = ({
  widths,
  service,
  checkList,
  setCheckList,
}) => {
  const value = checkList.includes(service.id)

  const onChangeCheck = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    event.stopPropagation()
    if (value) {
      const newCheckList = [...checkList].filter(el => el !== service.id)
      setCheckList(newCheckList)
      return
    }
    setCheckList(prev => [...prev, service.id])
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
        <p>{service.id}</p>
      </li>
      <li style={{ width: widths.title }}>
        <p className='w-[180px] overflow-hidden text-ellipsis'>
          {service.title}
        </p>
      </li>
      <li style={{ width: widths.prices }}>
        <p className='w-[180px] overflow-hidden text-ellipsis'>
          {pricesFormat(service.prices)}
        </p>
      </li>
      <li style={{ width: widths.updatedAt }}>
        <p>{dateFormat(service.updatedAt, { withTime: true })}</p>
      </li>
      <li style={{ width: widths.createdAt }}>
        <p>{dateFormat(service.createdAt, { withTime: true })}</p>
      </li>
      <li className={mainCl.special} style={{ width: widths.orders }}>
        <p
          style={{
            backgroundColor: value ? 'rgba(135, 30, 30, 0.505)' : '#2d3748',
          }}
        >
          {service._count.Order}
        </p>
        <p
          style={{
            backgroundColor: value ? 'rgba(177, 39, 39, 0.505)' : '#475264',
          }}
        >
          Заказы
        </p>
      </li>
    </ul>
  )
}

export default ServiceModelRow
