import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage/HomePage'
import RepairPage from './pages/RepairPage/RepairPage'

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<HomePage />} />
				<Route path='repair' element={<RepairPage />} />
				<Route path='*' element={<div>PAGE NOT FOUND!</div>} />
			</Route>
		</Routes>
	)
}

export default App
