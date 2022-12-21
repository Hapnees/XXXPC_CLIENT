import { useGetRepairCardQuery } from '@api/repairCard.api'
import Loader from '@components/UI/Loader/Loader'
import { RepairCardSlug } from '@interfaces/adminInterfaces/repair-card-slug.enum'
import { RepairCardResponse } from '@interfaces/repair/repair-card.interface'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DetailsPagePC from './pages/DetailsPagePC/DetailsPagePC'

const DetailsPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const slug = params.slug || ''

  const { data: repairCard, isLoading } = useGetRepairCardQuery(slug)

  const currentPage = (currentRepairCard: RepairCardResponse) => {
    if (!currentRepairCard) return

    switch (slug) {
      case RepairCardSlug.PC:
        return <DetailsPagePC repairCard={currentRepairCard} />
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
