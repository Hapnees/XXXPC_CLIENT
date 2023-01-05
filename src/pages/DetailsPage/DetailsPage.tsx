import React from 'react'
import { useGetRepairCardQuery } from '@api/repairCard.api'
import { RepairCardSlug } from '@interfaces/adminInterfaces/repair-card/repair-card-slug.enum'
import { RepairCardResponse } from '@interfaces/repair/repair-card.interface'
import { useNavigate, useParams } from 'react-router-dom'
import DetailsPageLAPTOP from './pages/DetailsPageLAPTOP/DetailsPageLAPTOP'
import DetailsPagePC from './pages/DetailsPagePC/DetailsPagePC'
import Loader from '@components/UI/Loader/Loader'

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
