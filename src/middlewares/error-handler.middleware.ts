import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit'
import ErrorWindow from '../components/UI/ErrorWindow/ErrorWindow'
import { AdminError } from '@interfaces/adminInterfaces/error.interface'
import { IError } from '@interfaces/error.interface'
import customToast from '@utils/customToast'

export const ErrorHandler: Middleware =
  (api: MiddlewareAPI) => next => action => {
    if (isRejectedWithValue(action)) {
      const errorMessage = (action.payload as IError).data
      if (errorMessage.messages) {
        const currentError = errorMessage.messages
        currentError.forEach(message => {
          customToast.error(message || 'Ошибка')
        })
      } else if (errorMessage.message) {
        const currentError = action.payload.data.message
        if (currentError) {
          if (typeof currentError === 'string') {
            console.error(currentError || 'Ошибка')
            customToast.error(currentError || 'Ошибка')
          } else if (Array.isArray(currentError)) {
            currentError.forEach(message => {
              customToast.error(message || 'Ошибка')
            })
          }
        }
      } else {
        const errors = action.payload.data as AdminError[]
        if (errors)
          customToast.error(ErrorWindow({ errors }), {
            style: { width: '450px' },
          })
        else {
          customToast.error('Ошибка')
        }
      }
    }
    return next(action)
  }
