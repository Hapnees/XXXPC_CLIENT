import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from './components/UI/Loader/Loader'
import MainLayout from './layouts/MainLayout/MainLayout'
import ConfirmPage from './pages/ConfirmPage/ConfirmPage'
import ContactPage from './pages/ContactPage/ContactPage'
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

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<HomePage />} />
				<Route path='repair' element={<RepairPage />} />
				<Route path='contact' element={<ContactPage />} />
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
		</Routes>
	)
}

export default App
