import React, { forwardRef, HTMLProps } from 'react'
import { Roles } from '@interfaces/roles.interface'
import cl from './AdminTableSelect.module.scss'

export const AdminTableSelect = forwardRef<
  HTMLSelectElement,
  HTMLProps<HTMLSelectElement>
>((props, ref) => {
  const rusValue = Roles[props.value as keyof typeof Roles]
  return (
    <select className={cl.select} {...props} ref={ref} value={rusValue}>
      <option value={Roles.USER}>Пользователь</option>
      <option value={Roles.ADMIN}>Администратор</option>
    </select>
  )
})

AdminTableSelect.displayName = 'AdminTableSelect'
