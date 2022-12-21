import { AdminTableInput, AdminTableSelect } from '@components/UI/AdminUi/index'
import React, { FC } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import {
  IUserUpdate,
  UsersGetResponse,
} from '@interfaces/adminInterfaces/index'
import mainCl from '../../tabs.module.scss'
import { UserModelWidths } from '../fields.type'

interface IProps {
  register: UseFormRegister<IUserUpdate[]>
  user: UsersGetResponse
  errors: FieldErrors<IUserUpdate[]>
  widths: UserModelWidths
  setCheckList: React.Dispatch<React.SetStateAction<number[]>>
  checkList: number[]
}

const emailPattern =
  /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const UserModelRow: FC<IProps> = ({
  register,
  user,
  errors,
  widths,
  setCheckList,
  checkList,
}) => {
  const value = checkList.includes(user.id)

  const onChangeCheck = () => {
    if (value) {
      const newCheckList = [...checkList].filter(el => el !== user.id)
      setCheckList(newCheckList)
      return
    }
    setCheckList(prev => [...prev, user.id])
  }

  return (
    <div>
      <ul
        className={mainCl.menu}
        style={{
          backgroundColor: value ? 'rgba(177, 39, 39, 0.505)' : 'transparent',
        }}
      >
        <li
          style={{ width: widths.check }}
          onClick={onChangeCheck}
          className={mainCl.not_input}
        >
          <input
            type='checkbox'
            className={mainCl.checkbox}
            checked={value}
            onChange={onChangeCheck}
          />
        </li>
        <li style={{ width: 70 }}>
          <AdminTableInput
            type='text'
            placeholder='№'
            width={widths.id}
            {...register(`${user.id}.id`, {
              required: 'Обязательное поле',
            })}
            error={errors[user.id]?.id}
          />
        </li>
        <li style={{ width: widths.username }}>
          <AdminTableInput
            type='text'
            placeholder='Имя пользователя'
            width={widths.username}
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
        <li style={{ width: widths.email }}>
          <AdminTableInput
            type='email'
            placeholder='Почта'
            width={widths.email}
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
        <li style={{ width: widths.role }} className={mainCl.not_input}>
          <AdminTableSelect {...register(`${user.id}.roleView`)} />
        </li>
        <li style={{ width: widths.hash }} className={mainCl.zero}>
          <AdminTableInput
            type='text'
            placeholder='Пароль'
            width={widths.hash}
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
        <li style={{ width: widths.hashedRt }} className={mainCl.zero}>
          <AdminTableInput
            type='text'
            placeholder='Токен обновления'
            width={widths.hashedRt}
            {...register(`${user.id}.hashedRt`)}
            error={errors[user.id]?.hashedRt}
          />
        </li>
        <li style={{ width: widths.avatarPath }} className={mainCl.zero}>
          <AdminTableInput
            type='text'
            placeholder='Аватарка'
            width={widths.avatarPath}
            {...register(`${user.id}.avatarPath`)}
            error={errors[user.id]?.avatarPath}
          />
        </li>
        <li style={{ width: widths.phone }} className={mainCl.zero}>
          <AdminTableInput
            type='text'
            placeholder='№ телефона'
            width={widths.phone}
            {...register(`${user.id}.phone`)}
            error={errors[user.id]?.phone}
          />
        </li>
        <li
          style={{
            width: widths.orders,
          }}
          className={mainCl.special}
        >
          <p
            style={{
              backgroundColor: value ? 'rgba(135, 30, 30, 0.505)' : '#2d3748',
            }}
          >
            {user._count?.orders}
          </p>
          <p
            style={{
              backgroundColor: value ? 'rgba(177, 39, 39, 0.505)' : '#475264',
            }}
          >
            Заказы
          </p>
        </li>
        <li style={{ width: widths.updatedAt }} className={mainCl.zero}>
          <AdminTableInput
            type='text'
            placeholder='Дата обновления'
            width={widths.updatedAt}
            {...register(`${user.id}.updatedAt`)}
            error={errors[user.id]?.updatedAt}
          />
        </li>
        <li style={{ width: widths.createdAt }}>
          <AdminTableInput
            type='text'
            placeholder='Дата регистрации'
            width={widths.createdAt}
            {...register(`${user.id}.createdAt`)}
            error={errors[user.id]?.createdAt}
          />
        </li>
      </ul>
    </div>
  )
}

export default UserModelRow
