import React, { FC, SetStateAction } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import cl from './Checkbox.module.scss'

interface IProps {
	isShow?: boolean
	setIsShow: React.Dispatch<SetStateAction<boolean>>
}

const Checkbox: FC<IProps> = ({ isShow, setIsShow }) => {
	return (
		<div className={cl.wrapper}>
			<input
				type='checkbox'
				id='showDate'
				className='hidden'
				checked={isShow}
				onChange={() => setIsShow(!isShow)}
			/>
			<div className={cl.checkbox}>
				<BsCheckLg className={cl.mark} />
			</div>
			<label htmlFor='showDate' className={cl.label}>
				Показать дату
			</label>
		</div>
	)
}

export default Checkbox
