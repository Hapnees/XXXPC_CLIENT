import { InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

interface IProfilePageInput {
	error?: FieldError
	title: string
	width?: number
	background?: string
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> &
	IProfilePageInput

export interface IProfilePageField extends TypeInputPropsField {}
