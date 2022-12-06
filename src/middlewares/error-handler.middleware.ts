import {
	isRejectedWithValue,
	Middleware,
	MiddlewareAPI,
} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { IError } from '../interfaces/error.interface'

export const ErrorHandler: Middleware =
	(api: MiddlewareAPI) => next => action => {
		if (isRejectedWithValue(action)) {
			const errorMessages = (action.payload as IError).data.messages
			if (errorMessages) {
				errorMessages.forEach(message => {
					toast.error(message || 'Ошибка')
				})
			} else {
				const errorMessage = action.payload.data.message
				if (errorMessage) {
					console.error(errorMessage || 'Ошибка')
					toast.error(errorMessage || 'Ошибка')
				} else {
					toast.error('Ошибка')
				}
			}
		}

		return next(action)
	}
