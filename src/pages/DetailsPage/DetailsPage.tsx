import React from 'react'
import { useGetRepairCardQuery } from '@api/repairCard.api'
import { RepairCardSlug } from '@interfaces/repair/repair-card-slug.enum'
import { RepairCardResponse } from '@interfaces/repair/repair-card.interface'
import { useParams } from 'react-router-dom'
import DetailsPageLAPTOP from './pages/DetailsPageLAPTOP/DetailsPageLAPTOP'
import DetailsPagePC from './pages/DetailsPagePC/DetailsPagePC'
import Loader from '@components/UI/Loader/Loader'
import DetailsPageSMARTPHONE from './pages/DetailsPageSMARTPHONE/DetailsPageSMARTPHONE'
import DetailsPageRESTORE_DATA from './pages/DetailsPageRESTORE_DATA/DetailsPageRESTORE_DATA'
import DetailsPageSERVER from './pages/DetailsPageSERVER/DetailsPageSERVER'
import DetailsPageTABLET from './pages/DetailsPageTABLET/DetailsPageTABLET'
import DetailsPageMONOBLOCK from './pages/DetailsPageMONOBLOCK/DetailsPageMONOBLOCK'
import DetailsPageMONITOR from './pages/DetailsPageMONITOR/DetailsPageMONITOR'

const DetailsPage = () => {
	const params = useParams()
	const slug = params.slug || ''

	const { data: repairCard, isLoading } = useGetRepairCardQuery(slug)

	const currentPage = (currentRepairCard: RepairCardResponse) => {
		if (!currentRepairCard) return

		switch (slug) {
			case RepairCardSlug.PC:
				return <DetailsPagePC services={repairCard?.services || []} />
			case RepairCardSlug.LAPTOP:
				return <DetailsPageLAPTOP services={repairCard?.services || []} />
			case RepairCardSlug.PHONE:
				return <DetailsPageSMARTPHONE services={repairCard?.services || []} />
			case RepairCardSlug.RESTORE_DATA:
				return <DetailsPageRESTORE_DATA services={repairCard?.services || []} />
			case RepairCardSlug.SERVER:
				return <DetailsPageSERVER services={repairCard?.services || []} />
			case RepairCardSlug.TABLET:
				return <DetailsPageTABLET services={repairCard?.services || []} />
			case RepairCardSlug.MONOBLOCK:
				return <DetailsPageMONOBLOCK services={repairCard?.services || []} />
			case RepairCardSlug.MONITOR:
				return <DetailsPageMONITOR services={repairCard?.services || []} />
		}
	}

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				repairCard && (
					<div className='px-[175px]'>
						{currentPage(repairCard) ? (
							currentPage(repairCard)
						) : (
							<>Подробности пока не добавлены!</>
						)}
					</div>
				)
			)}
		</>
	)
}

export default DetailsPage
