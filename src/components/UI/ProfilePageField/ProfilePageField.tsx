import React, { forwardRef } from 'react'
import AuthField from '../AuthField/AuthField'
import { IProfilePageField } from './ProfilePageField.interface'
import cl from './ProfilePageField.module.scss'

const ProfilePageField = forwardRef<HTMLInputElement, IProfilePageField>(
	({ error, title, ...props }, ref) => {
		return (
			<div className='flex flex-col gap-1'>
				<p>{title}</p>
				<AuthField className={cl.input} error={error} {...props} ref={ref} />
			</div>
		)
	}
)

ProfilePageField.displayName = 'ProfilePageField'

export default ProfilePageField
