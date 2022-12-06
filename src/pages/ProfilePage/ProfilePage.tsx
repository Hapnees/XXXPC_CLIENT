import React, { useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useGetProfileQuery, useUpdateUserMutation } from '../../api/user.api'
import AuthField from '../../components/UI/AuthField/AuthField'
import { useAppSelector } from '../../hooks/useAppSelector'
import { IUserUpdate } from '../../interfaces/user-update.interface'
import cl from './ProfilePage.module.scss'

// TODO: добавить паттерн для номера телефона

const ProfilePage = () => {
	const [avatar, setAvatar] = useState('')
	const { accessToken } = useAppSelector(state => state.auth)
	const headers = { authorization: `Bearer ${accessToken}` }
	const [updateUser] = useUpdateUserMutation()
	const { data: userData, refetch } = useGetProfileQuery(headers)
	const isFirst = useRef(true)

	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm<IUserUpdate>({ mode: 'onChange' })

	// Заполняем поля при загрузке страницы
	useEffect(() => {
		if (isFirst.current) {
			refetch()
			isFirst.current = false
		}

		setValue('username', userData?.username)
		setValue('email', userData?.email)
		setValue('phone', userData?.phone || '')
	}, [userData])

	const onChangeAvatar = (event: any) => {
		const file = event.target.files[0]
		const url = URL.createObjectURL(file)
		setAvatar(url)
	}

	const onSubmit: SubmitHandler<IUserUpdate> = async data => {
		data.avatarPath = avatar
		updateUser({ body: data, headers }).then(() =>
			toast.success('Профиль успешно обновлён')
		)
	}

	return (
		<>
			{userData ? (
				<div className='flex flex-col items-center'>
					<div className='flex gap-[100px]'>
						<div className={cl.wrapper__menu__categories}>
							<div className={cl.panel}></div>
							<ul className={cl.menu__categories}></ul>
						</div>

						<div>
							<p className={cl.top__title}>Редактирование профиля</p>
							<form onSubmit={handleSubmit(onSubmit)} className='w-[550px]'>
								<div className='flex justify-between mt-8'>
									<div>
										<input
											type='file'
											accept='.jpg, .png, .jpeg'
											className='hidden'
											id='avatar'
											onChange={event => onChangeAvatar(event)}
										/>
										<label htmlFor='avatar'>
											<img
												src={avatar || userData.avatarPath || ''}
												alt=''
												className={cl.avatar}
											/>
											<p className={cl.avatar__text}>Изменить фото</p>
										</label>
									</div>
									<div className='flex flex-col items-center gap-4 text-[#ffe0fa]'>
										<div className='flex flex-col gap-1'>
											<p>Имя пользователя</p>
											<AuthField
												type='text'
												className={cl.input}
												placeholder='Имя пользователя'
												{...register('username', {
													required: 'Обязательное поле',
													minLength: { value: 3, message: 'Минимум 3 символа' },
												})}
												error={errors.username}
											/>
										</div>
										<div className='flex flex-col gap-1'>
											<p>Почта</p>
											<AuthField
												type='email'
												className={cl.input}
												placeholder='Почта'
												{...register('email', {
													required: 'Обязательное поле',
													pattern: {
														value:
															/^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
														message: 'Некорректный email',
													},
												})}
												error={errors.email}
											/>
										</div>
										<div className='flex flex-col gap-1'>
											<p>Номер телефона</p>
											<AuthField
												type='text'
												className={cl.input}
												placeholder='Номер телефона'
												{...register('phone')}
												error={errors.phone}
											/>
										</div>
									</div>
								</div>
								<button>PUSH</button>
							</form>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)
}

export default ProfilePage
