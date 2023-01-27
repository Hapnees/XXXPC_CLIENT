import React, { useEffect, useState } from 'react'
import { useLazyGetRepairCardsForPageQuery } from '@api/repairCard.api'
import RepairCard from '@components/RepairCard/RepairCard'
import Loader from '@components/UI/Loader/Loader'
import cl from './RepairPage.module.scss'

const RepairPage = () => {
	const [isWaiting, setIsWaiting] = useState(false)
	const [getCards, { data: cards, isLoading }] =
		useLazyGetRepairCardsForPageQuery()

	useEffect(() => {
		setTimeout(() => {
			getCards()
				.unwrap()
				.then(() => {
					setIsWaiting(true)
				})
		}, 350)
	}, [])

	if (isLoading || !isWaiting) return <Loader />

	return (
		<div className='flex flex-col items-center mb-10'>
			<p className={cl.top__title}>Ремонт компьютерной техники</p>
			<div className='mt-6'>
				<ul className={cl.menu}>
					{cards?.map(card => (
						<li key={card.id}>
							<RepairCard card={card} />
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default RepairPage
