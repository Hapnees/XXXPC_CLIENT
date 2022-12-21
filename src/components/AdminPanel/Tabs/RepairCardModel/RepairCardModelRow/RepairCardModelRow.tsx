import React, { FC } from 'react'
import mainCl from '../../tabs.module.scss'
import { TypeRepairCardModel } from '../fields.type'
import { RepairCardsGetResponse } from '@interfaces/adminInterfaces'
import { dateFormat } from '@utils/date.format'

interface IProps {
  widths: TypeRepairCardModel
  card: RepairCardsGetResponse
  setCheckList: React.Dispatch<React.SetStateAction<number[]>>
  setCurrentCard: React.Dispatch<
    React.SetStateAction<RepairCardsGetResponse | undefined>
  >
  checkList: number[]
  viewCreateWindow: () => void
}

const RepairCardModelRow: FC<IProps> = ({
  widths,
  card,
  checkList,
  setCheckList,
  viewCreateWindow,
  setCurrentCard,
}) => {
  const value = checkList.includes(card.id)

  const onChangeCheck = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    event.stopPropagation()
    if (value) {
      const newCheckList = [...checkList].filter(el => el !== card.id)
      setCheckList(newCheckList)
      return
    }
    setCheckList(prev => [...prev, card.id])
  }

  const onClickRow = (
    event: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) => {
    event.stopPropagation()
    viewCreateWindow()
    setCurrentCard(card)
  }

  return (
    <div>
      <ul
        className={mainCl.menu__without__inputs}
        style={{
          backgroundColor: value ? 'rgba(177, 39, 39, 0.505)' : '',
        }}
        onClick={event => onClickRow(event)}
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
        <li style={{ width: widths.id }}>{card.id}</li>
        <li style={{ width: widths.title }}>
          <p className='overflow-hidden' style={{ width: widths.title - 20 }}>
            {card.title}
          </p>
        </li>
        <li style={{ width: widths.slug }}>
          <p className='overflow-hidden' style={{ width: widths.slug - 20 }}>
            {card.slug}
          </p>
        </li>
        <a
          href={card.iconPath}
          target='_blank'
          rel='noreferrer'
          style={{ width: widths.icon }}
          onClick={event => {
            event.stopPropagation()
          }}
        >
          <li style={{ width: widths.icon - 20 }}>
            <p className='overflow-hidden'>{card.iconPath}</p>
          </li>
        </a>
        <li style={{ width: widths.updatedAt }}>
          {dateFormat(card.updatedAt, { withTime: true })}
        </li>
        <li style={{ width: widths.createdAt }}>
          {dateFormat(card.createdAt, { withTime: true })}
        </li>
        <li className={mainCl.special} style={{ width: widths.services }}>
          <p
            style={{
              backgroundColor: value ? 'rgba(135, 30, 30, 0.505)' : '#2d3748',
            }}
          >
            {card._count.services}
          </p>
          <p
            style={{
              backgroundColor: value ? 'rgba(177, 39, 39, 0.505)' : '#475264',
            }}
          >
            Услуги
          </p>
        </li>
      </ul>
    </div>
  )
}

export default RepairCardModelRow
