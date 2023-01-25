import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cl from './HomePage.module.scss'
import image from '@assets/img/PC.png'
import { useGetNewsQuery } from '@api/news.api'

const HomePage = () => {
	const [newsNum, setNewsNum] = useState(0)

	const [offset, setOffset] = useState(0)
	const navigate = useNavigate()

	const { data: news } = useGetNewsQuery()

	useEffect(() => {
		if (!news || (news && news.length < 1)) return

		const interval = setInterval(() => {
			if (offset >= (news.length - 1) * 677) {
				setOffset(0)
				setNewsNum(0)
			} else {
				setOffset(prev => prev + 677)
				setNewsNum(prev => prev + 1)
			}
		}, 5_000)

		return () => {
			clearInterval(interval)
		}
	}, [offset, news])

	return (
		<div className={cl.wrapper}>
			<div className='my-auto w-[677px]'>
				<div className={cl.text__over__wrapper}>
					<div
						className={cl.text__wrapper}
						style={{ transform: `translateX(-${offset}px)` }}
					>
						{news?.map((el, idx) => (
							<div className={cl.text__container} key={idx}>
								<p className={cl.title}>{el.title}</p>

								<p className={cl.body}>{el.body}</p>
							</div>
						))}
					</div>
				</div>
				<div className='flex items-center gap-8'>
					<button className={cl.button} onClick={() => navigate('/repair')}>
						ремонт
					</button>

					<div className='flex gap-4'>
						{news?.map((_, idx) => (
							<>
								<input
									type='radio'
									id={idx.toString()}
									name='menu__circle'
									className='hidden'
									checked={idx === newsNum}
									onChange={() => {
										setNewsNum(idx)
										setOffset(677 * idx)
									}}
								/>
								<label htmlFor={idx.toString()} className={cl.circle}></label>
							</>
						))}
					</div>
				</div>
			</div>

			<div className='flex items-center justify-end'>
				<img src={image} alt='' className='w-[600px] h-[600px]' />
			</div>
		</div>
	)
}

export default HomePage
