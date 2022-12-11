import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLoader from './components/UI/AdminLoader/AdminLoader'
import Loader from './components/UI/Loader/Loader'
import AdminPanelLayout from './layouts/AdminPanelLayout/AdminPanelLayout'
import MainLayout from './layouts/MainLayout/MainLayout'
import AdminAuthPage from './pages/AdminPages/AdminAuthPage/AdminAuthPage'
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
      <Route path='admin' element={<AdminPanelLayout />}>
        <Route
          path=''
          element={
            <Suspense fallback={<AdminLoader />}>
              <AdminPage />
            </Suspense>
          }
        />
        <Route path='auth' element={<AdminAuthPage />} />
      </Route>
    </Routes>
  )
}

export default App
