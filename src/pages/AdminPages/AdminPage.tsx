import React, { useMemo } from 'react'
import OpenModelForm from '@components/AdminPanel/Tabs/OpenModel/OpenModelForm'
import UserModel from '@components/AdminPanel/Tabs/UserModel/UserModel'
import RepairCardModel from '@components/AdminPanel/Tabs/RepairCardModel/RepairCardModel'
import ServiceModel from '@components/AdminPanel/Tabs/ServiceModel/ServiceModel'
import OrderModel from '@components/AdminPanel/Tabs/OrderModel/OrderModel'
import { useAppSelector } from '@hooks/useAppSelector'
import { Tabs } from '@interfaces/tabs.interface'
import ModelLayout from '@layouts/ModelLayout/ModelLayout'

const AdminPage = () => {
  const { currentTab } = useAppSelector(state => state.tab)

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

  return <ModelLayout>{viewTab}</ModelLayout>
}

export default AdminPage
