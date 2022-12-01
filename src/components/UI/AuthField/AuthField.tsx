import React, { forwardRef } from 'react'
import { IField } from './AuthField.interface'
import cl from './AuthField.module.scss'
import { BiErrorCircle } from 'react-icons/bi'

const AuthField = forwardRef<HTMLInputElement, IField>(
	({ error, ...props }, ref) => {
		return (
			<div className={cl.wrapper}>
				<input
					className={cl.input}
					style={{ width: 280 }}
					ref={ref}
					{...props}
				/>

				{error && (
					<div className={cl.wrapper__error}>
						<BiErrorCircle size={20} />
						<p>{error.message}</p>
					</div>
				)}
			</div>
		)
	}
)

AuthField.displayName = 'AuthField'

export default AuthField
