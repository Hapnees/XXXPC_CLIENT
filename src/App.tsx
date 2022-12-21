import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AdminLoader } from '@components/UI/AdminUi/index'
import Loader from './components/UI/Loader/Loader'
import MainLayout from './layouts/MainLayout/MainLayout'
import ConfirmPage from './pages/ConfirmPage/ConfirmPage'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import OrderPage from './pages/OrderPage/OrderPage'
import RepairPage from './pages/RepairPage/RepairPage'

const DetailsPage = React.lazy(
  () =>
    import(
      /* webpackChunkName: "DetailsPage" */ './pages/DetailsPage/DetailsPage'
    )
)

const ProfilePage = React.lazy(
  () =>
    import(
      /* webpackChunkName: "ProfilePage" */ './pages/ProfilePage/ProfilePage'
    )
)

const MyOrdersPage = React.lazy(
  () =>
    import(
      /* webpackChunkName: "MyOrdersPage" */ './pages/MyOrdersPage/MyOrdersPage'
    )
)

const AdminPage = React.lazy(
  () =>
    import(/* webpackChunkName: "AdminPage" */ './pages/AdminPages/AdminPage')
)

const AdminPanelLayout = React.lazy(
  () =>
    import(
      /* webpackChunkName: "AdminPanelLayout" */ './layouts/AdminPanelLayout/AdminPanelLayout'
    )
)

const AdminAuthPage = React.lazy(
  () =>
    import(
      /* webpackChunkName: "AdminAuthPage" */ './pages/AdminPages/AdminAuthPage/AdminAuthPage'
    )
)

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<HomePage />} />
        <Route path='repair' element={<RepairPage />} />
        <Route path='auth/confirm/:token' element={<ConfirmPage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route
          path='repair/:slug'
          element={
            <Suspense fallback={<Loader />}>
              <DetailsPage />
            </Suspense>
          }
        />
        <Route
          path='profile'
          element={
            <Suspense fallback={<Loader />}>
              <ProfilePage />
            </Suspense>
          }
        />
        <Route
          path='orders'
          element={
            <Suspense fallback={<Loader />}>
              <MyOrdersPage />
            </Suspense>
          }
        />
        <Route path='order/:id' element={<OrderPage />} />
      </Route>
      <Route
        path='admin'
        element={
          <Suspense fallback=<AdminLoader />>
            <AdminPanelLayout />
          </Suspense>
        }
      >
        <Route
          path=''
          element={
            <Suspense fallback={<AdminLoader />}>
              <AdminPage />
            </Suspense>
          }
        />
        <Route
          path='auth'
          element={
            <Suspense fallback={<AdminLoader />}>
              <AdminAuthPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
