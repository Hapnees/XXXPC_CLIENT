import React, { FC } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { AdminError } from '../../../interfaces/adminInterfaces/error.interface'
import cl from './ErrorWindow.module.scss'

interface IProps {
  errors: AdminError[]
}

const ErrorWindow: FC<IProps> = ({ errors }) => {
  return (
    <ul className={cl.menu}>
      {errors.map(error => (
        <li key={error.id}>
          {/* <BsArrowRightShort size={20} /> */}
          <div>
            <p className='font-semibold'>№ {error.id}</p>
            <ul>
              {error.errors.map((el, idx) => (
                <li key={idx}>{el.msg}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ErrorWindow
