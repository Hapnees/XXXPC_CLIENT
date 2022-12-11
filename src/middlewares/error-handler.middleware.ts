import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import ErrorWindow from '../components/UI/ErrorWindow/ErrorWindow'
import { AdminError } from '../interfaces/adminInterfaces/error.interface'
import { IError } from '../interfaces/error.interface'

export const ErrorHandler: Middleware =
  (api: MiddlewareAPI) => next => action => {
    if (isRejectedWithValue(action)) {
      const errorMessages = (action.payload as IError).data.messages
      if (errorMessages) {
        errorMessages.forEach(message => {
          toast.error(message || 'Ошибка')
        })
      } else if (action.payload.data) {
        const errors = (action.payload as AdminError).data
        const errorMessages = errors.map(el => el.message)
        toast.error(ErrorWindow({ messages: errorMessages }), {
          style: { width: '450px' },
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
