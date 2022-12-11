import React, { forwardRef } from 'react'
import { Roles } from '../../../interfaces/roles.interface'
import cl from './AdminTableSelect.module.scss'

const AdminTableSelect = forwardRef<HTMLSelectElement>((props, ref) => {
  return (
    <select className={cl.select} {...props} ref={ref}>
      <option value={Roles.USER}>Пользователь</option>
      <option value={Roles.ADMIN}>Администратор</option>
    </select>
  )
})

AdminTableSelect.displayName = 'AdminTableSelect'

export default AdminTableSelect
