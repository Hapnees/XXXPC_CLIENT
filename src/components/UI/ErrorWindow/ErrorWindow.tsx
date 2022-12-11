import React, { FC } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import cl from './ErrorWindow.module.scss'

interface IProps {
  messages: string[]
}

const ErrorWindow: FC<IProps> = ({ messages }) => {
  return (
    <ul className={cl.menu}>
      {messages.map((message, idx) => (
        <li key={idx}>
          <BsArrowRightShort size={20} />
          <p>{message}</p>
        </li>
      ))}
    </ul>
  )
}

export default ErrorWindow
