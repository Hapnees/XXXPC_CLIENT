import { InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

interface IOrderTextInput {
  error?: FieldError
  width?: number
  background?: string
}

type TypeInputPropsField = InputHTMLAttributes<HTMLTextAreaElement> &
  IOrderTextInput

export interface IOrderTextField extends TypeInputPropsField {}
