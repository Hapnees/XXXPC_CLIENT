import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout/MainLayout'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
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

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<HomePage />} />
				<Route path='repair' element={<RepairPage />} />
				<Route
					path='repair/:slug'
					element={
						<Suspense fallback={null}>
							<DetailsPage />
						</Suspense>
					}
				/>
				<Route path='*' element={<NotFoundPage />} />
				<Route
					path='profile'
					element={
						<Suspense fallback={null}>
							<ProfilePage />
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	)
}

export default App
