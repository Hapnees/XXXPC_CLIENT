import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@components/AdminPanel/Header/Header'
import { useRefreshTokens } from '@hooks/index'

const AdminPanelLayout = () => {
  useRefreshTokens()

  return (
    <div className='bg-prisma-blue min-h-[100vh]'>
      <Header />
      <Outlet />
    </div>
  )
}

export default AdminPanelLayout
