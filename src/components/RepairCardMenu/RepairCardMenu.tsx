import React, { FC } from 'react'
import cl from './RepairCardMenu.module.scss'
import { BsGearFill } from 'react-icons/bs'

interface IProps {
  title: string
  array: string[]
}

const RepairCardMenu: FC<IProps> = ({ title, array }) => {
  return (
    <div className='px-4 text-[20px]'>
      <p className='mb-2'>{title}</p>

      <ul className={cl.menu}>
        {array.map((el, idx) => (
          <li key={idx}>
            <BsGearFill />
            <p>{el}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RepairCardMenu
