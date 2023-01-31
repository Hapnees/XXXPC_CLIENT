import React from 'react'
import { contactInfo } from '../contact-info'
import cl from './ContactInfo.module.scss'

const ContactInfo = () => {
	return (
		<div className={cl.wrapper}>
			<p className='mb-4'>Контактная информация</p>
			<div className='mb-2'>
				<p>{contactInfo.firstNumber}</p>
				<p>{contactInfo.secondNumber}</p>
			</div>
			<p>{contactInfo.email}</p>
		</div>
	)
}

export default ContactInfo
