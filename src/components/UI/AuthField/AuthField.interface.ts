import { InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

interface IAuthInput {
	error?: FieldError
	horizontal?: boolean
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IAuthInput

export interface IField extends TypeInputPropsField {}
