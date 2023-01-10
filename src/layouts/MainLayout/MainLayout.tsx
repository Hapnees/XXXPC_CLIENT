import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@components/Header/Header'
import { useRefreshTokens } from '@hooks/useRefreshTokens'
import { useUpdateOnlineMutation } from '@api/user.api'
import { useHeaders } from '@hooks/useHeaders'
import { useAuth } from '@hooks/useAuth'
import cl from './MainLayout.module.scss'

const MainLayout = () => {
  const headers = useHeaders()
  const isAuth = useAuth()
  const [updateOnline] = useUpdateOnlineMutation()

  const handler = async (event: any) => {
    event.preventDefault()
    await updateOnline({ isOnline: false, headers })
    event.returnValue = ''
    return ''
  }

  // Обновляем токены
  useRefreshTokens()

  // Обновляем онлайн при входе
  useEffect(() => {
    if (!isAuth) return
    updateOnline({ isOnline: true, headers })

    window.addEventListener('beforeunload', handler)

    return () => {
      window.removeEventListener('beforeunload', handler)
    }
  }, [])

  return (
    <div className={cl.wrapper}>
      <Header />
      <Outlet />
    </div>
  )
}

export default MainLayout
