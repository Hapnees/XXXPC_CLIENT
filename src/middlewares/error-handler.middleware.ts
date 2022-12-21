import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import ErrorWindow from '../components/UI/ErrorWindow/ErrorWindow'
import { AdminError } from '@interfaces/adminInterfaces/index'
import { IError } from '@interfaces/error.interface'

export const ErrorHandler: Middleware =
  (api: MiddlewareAPI) => next => action => {
    if (isRejectedWithValue(action)) {
      const errorMessage = (action.payload as IError).data
      if (errorMessage.messages) {
        const currentError = errorMessage.messages
        currentError.forEach(message => {
          toast.error(message || 'Ошибка')
        })
      } else if (errorMessage.message) {
        const currentError = action.payload.data.message
        if (currentError) {
          if (typeof currentError === 'string') {
            console.error(currentError || 'Ошибка')
            toast.error(currentError || 'Ошибка')
          } else if (Array.isArray(currentError)) {
            currentError.forEach(message => {
              toast.error(message || 'Ошибка')
            })
          }
        }
      } else {
        const errors = action.payload.data as AdminError[]
        if (errors)
          toast.error(ErrorWindow({ errors }), {
            style: { width: '450px' },
          })
        else {
          toast.error('Ошибка')
        }
      }
    }
    return next(action)
  }
