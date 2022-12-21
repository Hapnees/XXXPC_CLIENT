import React, { FC } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { FaMinus } from 'react-icons/fa'
import { IoMdCreate } from 'react-icons/io'
import cl from './ButtonLine.module.scss'

interface IProps {
  title: string
  onClickCreate: (event: React.MouseEvent) => void
  onClickDelete: (event: React.MouseEvent) => void
}

const ButtonLine: FC<IProps> = ({ title, onClickCreate, onClickDelete }) => {
  return (
    <div className='flex gap-2'>
      <p className='text-[20px]'>{title}</p>
      <button className={cl.button__update}>
        <p>Обновить</p>
        <IoMdCreate />
      </button>
      <button
        className={cl.button__create}
        onClick={event => onClickCreate(event)}
      >
        <p>Создать</p>
        <BsPlusLg />
      </button>
      <button
        className={cl.button__delete}
        onClick={event => onClickDelete(event)}
      >
        <p>Удалить</p>
        <FaMinus />
      </button>
    </div>
  )
}

export default ButtonLine
