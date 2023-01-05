import React, { forwardRef, HTMLProps } from 'react'
import { RolesView } from '@interfaces/roles.interface'
import cl from './AdminTableSelect.module.scss'

export const AdminTableSelect = forwardRef<
  HTMLSelectElement,
  HTMLProps<HTMLSelectElement>
>((props, ref) => {
  const rusValue = RolesView[props.value as keyof typeof RolesView]
  return (
    <select className={cl.select} {...props} ref={ref} value={rusValue}>
      <option value={RolesView.USER}>Пользователь</option>
      <option value={RolesView.ADMIN}>Администратор</option>
    </select>
  )
})

AdminTableSelect.displayName = 'AdminTableSelect'
