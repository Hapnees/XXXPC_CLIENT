import React, { forwardRef } from 'react'
import cl from './PopupWindow.module.scss'

const PopupWindow = forwardRef<HTMLUListElement>((props, ref) => {
  return (
    <ul className={cl.menu} ref={ref}>
      <li>Профиль</li>
      <li>Выйти</li>
    </ul>
  )
})

PopupWindow.displayName = 'PopupWindow'

export default PopupWindow
