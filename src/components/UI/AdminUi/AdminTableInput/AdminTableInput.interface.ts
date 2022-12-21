import { InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

interface IAdminTableInput {
  error?: FieldError
  width: number
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> &
  IAdminTableInput

export interface IAdminTableField extends TypeInputPropsField {}
