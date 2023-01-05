import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '@components/AdminPanel/Header/Header'
import { useAuth, useRefreshTokens } from '@hooks/index'
import { AdminLoader } from '@components/UI/AdminUi'
import { Roles } from '@interfaces/roles.interface'
import customToast from '@utils/customToast'

const AdminPanelLayout = () => {
  useRefreshTokens()
  const isAuth = useAuth(Roles.ADMIN)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      customToast.error('Вы не являетесь администратором!')
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }, [])

  return (
    <div className='bg-prisma-blue min-h-[100vh]'>
      <Header />
      {isAuth ? <Outlet /> : <AdminLoader />}
    </div>
  )
}

export default AdminPanelLayout
