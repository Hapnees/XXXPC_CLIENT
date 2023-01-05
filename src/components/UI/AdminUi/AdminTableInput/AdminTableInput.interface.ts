import { InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

interface IAdminTableInput {
  error?: FieldError
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> &
  IAdminTableInput

export interface IAdminTableField extends TypeInputPropsField {}
