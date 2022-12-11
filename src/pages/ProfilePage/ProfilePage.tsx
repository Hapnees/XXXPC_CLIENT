import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import ProfilePageField from '../../components/UI/ProfilePageField/ProfilePageField'
import { useProfle } from '../../hooks/useProfile'
import { useUpdateUser } from '../../hooks/useUpdateUser'
import { ImageValidator } from '../../validators/image.validator'
import cl from './ProfilePage.module.scss'
import { BsCheckCircleFill } from 'react-icons/bs'
import { MdWarning } from 'react-icons/md'
import { useSendEmailMutation } from '../../api/mail.api'
import { useHeaders } from '../../hooks/useHeaders'
import { toast } from 'react-toastify'
import Loader from '../../components/UI/Loader/Loader'
import { IUserUpdate } from '../../interfaces/user/user-update.interface'

const emailPattern =
  /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const phonePattern = /^[+]?\d+$/
const usernamePattern = /^[^\d+]/

const ProfilePage = () => {
  const headers = useHeaders()
  const [sendEmail] = useSendEmailMutation()
  const [avatarUrl, setAvatarUrl] = useState('')
  const [avatar, setAvatar] = useState<File>()
  const updateUser = useUpdateUser(avatar)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IUserUpdate>({ mode: 'onChange' })

  // Получаем данные о пользователе и заполняем ими поля при загрузке страницы
  const { data: userData, isLoading } = useProfle(setValue)

  const onChangeAvatar = (event: any) => {
    const file = event.target.files[0]
    ImageValidator(file.name)

    setAvatar(file)
    const url = URL.createObjectURL(file)
    setAvatarUrl(url)
  }

  const onSubmit: SubmitHandler<IUserUpdate> = async data => {
    updateUser(data)
  }

  return (
    <div className={cl.wrapper}>
      <div className={cl.container}>
        <p className={cl.top__title}>Редактирование профиля</p>

        {isLoading ? (
          <Loader />
        ) : (
          userData && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-[100px] h-[570px]'
            >
              <div className={cl.form__content}>
                <div>
                  <input
                    type='file'
                    accept='.jpg, .png, .jpeg, .PNG'
                    className='hidden'
                    id='avatar'
                    onChange={event => onChangeAvatar(event)}
                  />
                  <label htmlFor='avatar'>
                    <img
                      src={avatarUrl || userData.avatarPath || ''}
                      alt=''
                      className={cl.avatar}
                    />
                    <p className={cl.avatar__text}>Изменить фото</p>
                  </label>
                </div>
                <div className='flex flex-col items-start gap-4 text-[#ffe0fa]'>
                  <ProfilePageField
                    title='Имя пользователя'
                    type='text'
                    className={cl.input}
                    placeholder='Имя пользователя'
                    {...register('username', {
                      required: 'Обязательное поле',
                      minLength: { value: 3, message: 'Минимум 3 символа' },
                      pattern: {
                        value: usernamePattern,
                        message: 'Некорректное имя пользователя',
                      },
                    })}
                    error={errors.username}
                  />
                  <ProfilePageField
                    title='Почта'
                    type='email'
                    className={cl.input}
                    placeholder='Почта'
                    {...register('email', {
                      required: 'Обязательное поле',
                      pattern: {
                        value: emailPattern,
                        message: 'Некорректный email',
                      },
                    })}
                    error={errors.email}
                  />
                  <ProfilePageField
                    title='Новый пароль'
                    type='password'
                    className={cl.input}
                    placeholder='Новый пароль'
                    {...register('password', {
                      minLength: { value: 6, message: 'Минимум 6 символов' },
                    })}
                    error={errors.password}
                  />
                  <div className='flex flex-col gap-1'>
                    <ProfilePageField
                      title='Номер телефона'
                      type='text'
                      className={cl.input}
                      placeholder='Номер телефона'
                      {...register('phone', {
                        pattern: {
                          value: phonePattern,
                          message: 'Некорректный номер телефона',
                        },
                      })}
                      error={errors.phone}
                    />
                    {!userData.phone && (
                      <p className={cl.phone__text}>
                        Введите номер телефона для улучшения обратной связи
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button className={cl.button}>Сохранить</button>
            </form>
          )
        )}
      </div>
    </div>
  )
}

export default ProfilePage
