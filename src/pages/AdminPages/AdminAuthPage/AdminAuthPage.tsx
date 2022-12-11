import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useLoginAdminMutation } from '../../../api/auth.api'
import { ILoginForm } from '../../../components/AuthForms/LoginForm/LoginForm.interface'
import AdminAuthField from '../../../components/UI/AdminAuthField/AdminAuthField'
import { useActions } from '../../../hooks/useActions'
import { useAuth } from '../../../hooks/useAuth'
import { Roles } from '../../../interfaces/roles.interface'
import cl from './AdminAuthPage.module.scss'

const emailPattern =
  /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const AdminAuthPage = () => {
  const navigte = useNavigate()
  const [loginAdmin] = useLoginAdminMutation()
  const { setAuth } = useActions()
  const isAuth = useAuth(Roles.ADMIN)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>({ mode: 'onChange' })

  const onSubmit: SubmitHandler<ILoginForm> = async data => {
    loginAdmin(data)
      .unwrap()
      .then(response => {
        setAuth(response)
        navigte('/admin')
      })
  }

  useEffect(() => {
    if (!isAuth) return

    toast.info('Вы уже авторизованы')
    setTimeout(() => {
      navigte('/admin')
    }, 1000)
  }, [])

  return (
    <div className={cl.wrapper}>
      <div className='flex flex-col gap-4 px-8 py-4 border border-[#1a202c] rounded-md'>
        <p className='text-[35px] font-bold text-[#edf2f7] text-center'>
          Авторизация
        </p>
        <form
          className='flex flex-col items-center gap-4'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex flex-col gap-2'>
            <AdminAuthField
              type='email'
              placeholder='Почта'
              autoFocus
              {...register('email', {
                required: 'Обязательное поле',
                pattern: {
                  value: emailPattern,
                  message: 'Некорректная почта',
                },
              })}
              error={errors.email}
            />
            <AdminAuthField
              type='password'
              placeholder='Пароль'
              {...register('password', {
                required: 'Обязательное поле',
                minLength: { value: 6, message: 'Минимум 6 символов' },
              })}
              error={errors.password}
            />
          </div>

          <button className={cl.button}>Войти</button>
        </form>
      </div>
    </div>
  )
}

export default AdminAuthPage
