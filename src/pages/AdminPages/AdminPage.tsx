import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import OpenModelForm from '../../components/AdminPanel/Tabs/OpenModel/OpenModelForm'
import UserModel from '../../components/AdminPanel/Tabs/UserModel/UserModel'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAuth } from '../../hooks/useAuth'
import { Tabs } from '../../interfaces/tabs.interface'
import { Roles } from '../../interfaces/roles.interface'
import RepairCardModel from '../../components/AdminPanel/Tabs/RepairCardModel/RepairCardModel'
import ServiceModel from '../../components/AdminPanel/Tabs/ServiceModel/ServiceModel'
import OrderModel from '../../components/AdminPanel/Tabs/OrderModel/OrderModel'

const AdminPage = () => {
  const isAuth = useAuth(Roles.ADMIN)
  const navigate = useNavigate()
  const { currentTab } = useAppSelector(state => state.tab)

  useEffect(() => {
    if (!isAuth) {
      toast.error('Вы не являетесь администратором!')
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }, [])

  const viewTab = useMemo(() => {
    switch (currentTab) {
      case Tabs.MODELS:
        return <OpenModelForm />
      case Tabs.USER:
        return <UserModel />
      case Tabs.REPAIRCARD:
        return <RepairCardModel />
      case Tabs.SERVICE:
        return <ServiceModel />
      case Tabs.ORDER:
        return <OrderModel />
    }
  }, [currentTab])

  return <div>{viewTab}</div>
}

export default AdminPage
