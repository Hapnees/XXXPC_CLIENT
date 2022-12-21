import React, { FC } from 'react'
import { AuthField } from '@components/UI/AdminUi'
import cl from './LoginForm.module.scss'
import { BsGoogle } from 'react-icons/bs'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ILoginForm } from './LoginForm.interface'
import { useLogin } from '@hooks/useLogin'

interface IProps {
  setAuthState: () => void
  closeWindow: () => void
}

const emailPattern =
  /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const LoginForm: FC<IProps> = ({ setAuthState, closeWindow }) => {
  const loginUser = useLogin(closeWindow)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>({ mode: 'onChange' })

  const onSubmit: SubmitHandler<ILoginForm> = async data => {
    loginUser(data)
  }

  return (
    <>
      <p className='text-[25px] tracking-wide'>Вход</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-2 py-4'>
          <AuthField
            placeholder='Почта'
            type='email'
            autoFocus
            {...register('email', {
              required: 'Обязательное поле',
              pattern: {
                value: emailPattern,
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
          <div className='grid grid-cols-2 gap-2 w-full mb-2'>
            <button className={cl.button}>Войти</button>
            <button className={cl.button} onClick={setAuthState}>
              Регистрация
            </button>
          </div>
          <div className={cl.button__google}>
            <BsGoogle />
            <p>Войти с Google</p>
          </div>
        </div>
      </form>
    </>
  )
}

export default LoginForm
