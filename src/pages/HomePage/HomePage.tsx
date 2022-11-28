import React from 'react'
import SpecialButton from '../../components/UI/SpecialButton/SpecialButton'
import cl from './HomePage.module.scss'
import image from '../../assets/img/PC.png'

const HomePage = () => {
	return (
		<div className={cl.wrapper}>
			<div className='my-auto'>
				<div className='mb-[40px]'>
					<p className={cl.title}>КАКАЯ-ТО ВАЖНАЯ ИНФОРМАЦИЯ</p>
					<p className={cl.body}>
						Ещё какая-то очень-очень важная инфморация более мелким текстом,
						которая должна занимать 3 строчки
					</p>
				</div>
				<SpecialButton className={cl.special__button}>кнопка</SpecialButton>
			</div>

			<div className='flex items-center justify-end'>
				<img src={image} alt='' className='w-[600px] h-[600px]' />
			</div>
		</div>
	)
}

export default HomePage
