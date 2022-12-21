import { useGetRepairCardsForPageQuery } from '@api/repairCard.api'
import RepairCard from '@components/RepairCard/RepairCard'
import Loader from '@components/UI/Loader/Loader'
import React from 'react'
import cl from './RepairPage.module.scss'

const RepairPage = () => {
  const { data: cards, isLoading } = useGetRepairCardsForPageQuery()

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='flex flex-col items-center'>
          <p className={cl.top__title}>Ремонт компьютерной техники</p>
          <div className='mt-6'>
            <div>
              <ul className={cl.menu}>
                {cards?.map(card => (
                  <li key={card.id}>
                    <RepairCard card={card} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RepairPage
