import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRegisterMutation } from '../../../api/auth.api'
import { useActions } from '../../../hooks/useActions'
import AuthField from '../../UI/AuthField/AuthField'
import { IRegisterForm } from './RegisterForm.interface'
import cl from './RegisterForm.module.scss'

interface IProps {
	setAuthState: () => void
	closeWindow: () => void
}

const RegisterForm: FC<IProps> = ({ setAuthState, closeWindow }) => {
	const [registerUser] = useRegisterMutation()
	const { setAuth } = useActions()

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IRegisterForm>({ mode: 'onChange' })

	const onSubmit: SubmitHandler<IRegisterForm> = async data => {
		registerUser(data)
			.unwrap()
			.then(response => {
				setAuth(response)
				closeWindow()
			})
	}

	return (
		<>
			<p className='text-[25px] tracking-wide'>Регистрация</p>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='flex flex-col gap-2 py-4'>
					<AuthField
						placeholder='Имя пользователя'
						type='text'
						autoFocus
						{...register('username', {
							required: 'Обязательное поле',
							minLength: { value: 3, message: 'Минимум 3 символа' },
						})}
						error={errors.username}
					/>
					<AuthField
						placeholder='Почта'
						type='email'
						autoFocus
						{...register('email', {
							required: 'Обязательное поле',
							pattern: {
								value:
									/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: 'Некорректный email',
							},
						})}
						error={errors.email}
					/>
					<AuthField
						placeholder='Пароль'
						type='password'
						{...register('password', {
							required: 'Обязательное поле',
							minLength: { value: 6, message: 'Минимум 6 символов' },
						})}
						error={errors.password}
					/>
				</div>

				<div>
					<div className='flex flex-col gap-2 w-full mb-2'>
						<button className={cl.button__special}>Зарегестрироваться</button>
						<button className={cl.button} onClick={setAuthState}>
							Назад
						</button>
					</div>
				</div>
			</form>
		</>
	)
}

export default RegisterForm
