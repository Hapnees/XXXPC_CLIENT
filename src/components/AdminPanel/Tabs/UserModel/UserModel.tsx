import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Obj } from 'reselect/es/types'
import {
  useGetUsersQuery,
  useUpdateUsersMutation,
} from '../../../../api/user.api'
import { useHeaders } from '../../../../hooks/useHeaders'
import {
  AdminError,
  AdminUsersGetType,
} from '../../../../interfaces/adminInterfaces/error.interface'
import { IUserUpdate } from '../../../../interfaces/adminInterfaces/user-update.interface'
import { UsersGetResponse } from '../../../../interfaces/adminInterfaces/users-get.interface'
import { Roles, RolesResponse } from '../../../../interfaces/roles.interface'
import { dateFormat } from '../../../../utils/date.format'
import { objectCompare } from '../../../../utils/objectCompare.util'
import AdminLoader from '../../../UI/AdminLoader/AdminLoader'
import AdminTableInput from '../../../UI/AdminTableInput/AdminTableInput'
import AdminTableSelect from '../../../UI/AdminTableSelect/AdminTableSelect'
import mainCl from '../tabs.module.scss'

const emailPattern =
  /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const UserModel = () => {
  const [updateUsers] = useUpdateUsersMutation()
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    setError,
  } = useForm<IUserUpdate[]>({ mode: 'onChange' })
  const [widths, setWidths] = useState({
    username: 0,
    email: 0,
    role: 0,
    hash: 0,
    hashedRt: 0,
    avatarPath: 0,
    phone: 0,
    updatedAt: 0,
    createdAt: 0,
  })
  const userRef = useRef<HTMLLIElement>(null)
  const emailRef = useRef<HTMLLIElement>(null)
  const roleRef = useRef<HTMLLIElement>(null)
  const hashRef = useRef<HTMLLIElement>(null)
  const hashedRtRef = useRef<HTMLLIElement>(null)
  const avatarPathRef = useRef<HTMLLIElement>(null)
  const phoneRef = useRef<HTMLLIElement>(null)
  const updatedAtRef = useRef<HTMLLIElement>(null)
  const createdAtRef = useRef<HTMLLIElement>(null)

  const headers = useHeaders()
  const { data: usersData, isLoading } = useGetUsersQuery(headers)
  const [usersErrors, setUsersErrors] = useState<AdminError>({} as AdminError)

  useLayoutEffect(() => {
    setWidths({
      username: userRef.current?.offsetWidth || 0,
      email: emailRef.current?.offsetWidth || 0,
      role: roleRef.current?.offsetWidth || 0,
      hash: hashRef.current?.offsetWidth || 0,
      hashedRt: hashedRtRef.current?.offsetWidth || 0,
      avatarPath: avatarPathRef.current?.offsetWidth || 0,
      phone: phoneRef.current?.offsetWidth || 0,
      updatedAt: updatedAtRef.current?.offsetWidth || 0,
      createdAt: createdAtRef.current?.offsetWidth || 0,
    })
  }, [usersData])

  useEffect(() => {
    usersData?.forEach(el => {
      setValue(`${el.id}.username`, el.username)
      setValue(`${el.id}.email`, el.email)
      el.role && setValue(`${el.id}.role`, Roles[el.role])
      setValue(`${el.id}.password`, el.hash)
      setValue(`${el.id}.hashedRt`, el.hashedRt)
      setValue(`${el.id}.avatarPath`, el.avatarPath)
      setValue(`${el.id}.phone`, el.phone)
      el.updatedAt &&
        setValue(
          `${el.id}.updatedAt`,
          dateFormat(el.updatedAt, { withTime: true })
        )
      el.createdAt &&
        setValue(
          `${el.id}.createdAt`,
          dateFormat(el.createdAt, { withTime: true })
        )
    })
  }, [usersData])

  useEffect(() => {
    if (!Object.keys(usersErrors).length) return

    console.log(usersErrors)
    usersErrors.data.map(el => {
      const key = Object.keys(el.error)[1] as keyof AdminUsersGetType
      setError(`${el.error.id}.${key}`, { message: 'Неверное значение' })
    })
  }, [usersErrors])

  const onSubmit: SubmitHandler<IUserUpdate[]> = async data => {
    if (!usersData) return
    const dataArray = Object.values(data).reverse()

    const changes = () => {
      const changes: {
        id: number
        changes: UsersGetResponse & { password?: string }
      }[] = []
      for (let i = 0; i < dataArray.length; i++) {
        const {
          role: roleOld,
          updatedAt: updatedAtOld,
          createdAt: createdAtOld,
          hash,
          ...oldData
        } = usersData[i]
        const {
          role: roleNew,
          password,
          updatedAt: updatedAtNew,
          createdAt: createdAtNew,
          ...newData
        } = dataArray[i]

        const currentObject = objectCompare(oldData, newData)
        changes.push(currentObject)

        if (roleNew && roleOld && roleNew !== Roles[roleOld]) {
          changes[changes.length - 1].changes['role'] = Object.keys(Roles)[
            Object.values(Roles).indexOf(roleNew)
          ] as RolesResponse | undefined
        }

        if (password && password !== hash) {
          changes[changes.length - 1].changes['password'] = password
        }
      }
      return changes.filter(el => Object.keys(el.changes).length !== 0)
    }

    const changeDataArray = changes()
    if (!changeDataArray.length) {
      toast.error('Изменений нет!')
      return
    }

    updateUsers({ body: { data: changeDataArray }, headers })
      .unwrap()
      .then(response => toast.success(response.message))
      .catch(reject => {
        setUsersErrors(reject)
      })
  }

  return (
    <>
      {isLoading ? (
        <AdminLoader />
      ) : (
        usersData && (
          <div className={mainCl.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex gap-2 pl-[5px]'>
                <p className='text-[20px]'>Пользователи</p>
                <button className={mainCl.button__apply}>Применить</button>
              </div>
              <ul className={mainCl.top__menu}>
                <li>№</li>
                <li ref={userRef}>Имя пользователя</li>
                <li ref={emailRef}>Почта</li>
                <li ref={roleRef}>Роль</li>
                <li ref={hashRef}>Пароль</li>
                <li ref={hashedRtRef}>Токен обновления</li>
                <li ref={avatarPathRef}>Аватарка</li>
                <li ref={phoneRef}>№ телефона</li>
                <li ref={updatedAtRef}>Дата обновления</li>
                <li ref={createdAtRef}>Дата регистрации</li>
              </ul>
              <ul className={mainCl.content__menu}>
                {usersData.map(user => (
                  <li key={user.id}>
                    <ul className={mainCl.menu}>
                      <li className={mainCl.li__hover}>{user.id}</li>
                      <li
                        style={{ width: widths.username }}
                        className={mainCl.zero}
                      >
                        <AdminTableInput
                          type='text'
                          placeholder='Имя пользователя'
                          {...register(`${user.id}.username`, {
                            required: 'Обязательное поле',
                            minLength: {
                              value: 3,
                              message: 'Минимум 3 символа',
                            },
                          })}
                          error={errors[user.id]?.username}
                        />
                      </li>
                      <li
                        style={{ width: widths.email }}
                        className={mainCl.zero}
                      >
                        <AdminTableInput
                          type='email'
                          placeholder='Имя пользователя'
                          {...register(`${user.id}.email`, {
                            required: 'Обязательное поле',
                            pattern: {
                              value: emailPattern,
                              message: 'Некорректный email',
                            },
                          })}
                          error={errors[user.id]?.email}
                        />
                      </li>
                      <li
                        style={{ width: widths.role }}
                        className={mainCl.li__hover}
                      >
                        <AdminTableSelect {...register(`${user.id}.role`)} />
                      </li>
                      <li
                        style={{ width: widths.hash }}
                        className={mainCl.zero}
                      >
                        <AdminTableInput
                          type='text'
                          placeholder='Пароль'
                          {...register(`${user.id}.password`, {
                            required: 'Обязательное поле',
                            minLength: {
                              value: 6,
                              message: 'Минимум 6 символа',
                            },
                          })}
                          error={errors[user.id]?.password}
                        />
                      </li>
                      <li
                        style={{ width: widths.hashedRt }}
                        className={mainCl.zero}
                      >
                        <AdminTableInput
                          type='text'
                          placeholder='Токен обновления'
                          {...register(`${user.id}.hashedRt`)}
                          error={errors[user.id]?.hashedRt}
                        />
                      </li>
                      <li
                        style={{ width: widths.avatarPath }}
                        className={mainCl.zero}
                      >
                        <AdminTableInput
                          type='text'
                          placeholder='Аватарка'
                          {...register(`${user.id}.avatarPath`)}
                          error={errors[user.id]?.avatarPath}
                        />
                      </li>
                      <li
                        style={{ width: widths.phone }}
                        className={mainCl.zero}
                      >
                        <AdminTableInput
                          type='text'
                          placeholder='№ телефона'
                          {...register(`${user.id}.phone`)}
                          error={errors[user.id]?.phone}
                        />
                      </li>
                      <li
                        style={{ width: widths.updatedAt }}
                        className={mainCl.zero}
                      >
                        <AdminTableInput
                          type='text'
                          placeholder='Дата обновления'
                          {...register(`${user.id}.updatedAt`)}
                          error={errors[user.id]?.updatedAt}
                        />
                      </li>
                      <li style={{ width: widths.createdAt }}>
                        <AdminTableInput
                          type='text'
                          placeholder='Дата регистрации'
                          {...register(`${user.id}.createdAt`)}
                          error={errors[user.id]?.createdAt}
                        />
                      </li>
                    </ul>
                  </li>
                ))}
              </ul>
            </form>
          </div>
        )
      )}
    </>
  )
}

export default UserModel
