import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RepairCardSlug } from '../../interfaces/repair/repair-valid-params.enum'
import DetailsPagePC from './pages/DetailsPagePC/DetailsPagePC'

const validParams: RepairCardSlug[] = [RepairCardSlug.pc, RepairCardSlug.laptop]

const DetailsPage = () => {
	const [page, setPage] = useState(<></>)
	const params = useParams()
	const navigate = useNavigate()
	const slug = params.slug

	// Проверка параметров на валидность
	useEffect(() => {
		if (!(slug && validParams.some(el => el === slug))) {
			navigate('*')
			return
		}

		switch (slug) {
			case RepairCardSlug.pc:
				setPage(<DetailsPagePC />)
				return
		}
	}, [params])

	return <div className='px-[175px]'>{page}</div>
}

export default DetailsPage
