import { AdminTableInput, AdminTableSelect } from '@components/UI/AdminUi/index'
import React, { FC } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { IUserUpdate, UsersGetResponse } from '@interfaces/adminInterfaces/user'
import mainCl from '../../tabs.module.scss'
import { dateFormat } from '@utils/date.format'
import { IFieldMenuElement } from '@interfaces/adminInterfaces/fieldMenuElement.interface'

enum Online {
  ONLINE = 'Онлайн',
  OFFLINE = 'Оффлайн',
}

interface IProps {
  register: UseFormRegister<IUserUpdate[]>
  user: UsersGetResponse
  errors: FieldErrors<IUserUpdate[]>
  setCheckList: React.Dispatch<React.SetStateAction<number[]>>
  checkList: number[]
  checkFieldsList: IFieldMenuElement[]
  onClickUserOrders: () => void
}

const emailPattern =
  /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const UserModelRow: FC<IProps> = ({
  register,
  user,
  errors,
  setCheckList,
  checkList,
  onClickUserOrders,
  checkFieldsList,
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
          backgroundColor: value ? 'rgba(177, 39, 39, 0.505)' : '',
        }}
      >
        <li
          onClick={onChangeCheck}
          className={`${mainCl.not_input} ${mainCl.short__element}`}
        >
          <input
            type='checkbox'
            className={mainCl.checkbox}
            checked={value}
            onChange={onChangeCheck}
          />
        </li>
        <li className={mainCl.short__element}>
          <p>{user.id}</p>
        </li>
        {checkFieldsList.find(el => el.title === 'Имя пользователя')
          ?.checked && (
          <li>
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
        )}
        {checkFieldsList.find(el => el.title === 'Почта')?.checked && (
          <li>
            <AdminTableInput
              type='email'
              placeholder='Почта'
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
        )}
        {checkFieldsList.find(el => el.title === 'Роль')?.checked && (
          <li className={mainCl.not_input}>
            <AdminTableSelect {...register(`${user.id}.roleView`)} />
          </li>
        )}
        {checkFieldsList.find(el => el.title === 'Пароль')?.checked && (
          <li>
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
        )}
        {checkFieldsList.find(el => el.title === 'Онлайн')?.checked && (
          <li
            className={mainCl.not_input}
            style={{
              backgroundColor: user.isOnline ? 'rgba(63, 205, 50, 0.615)' : '',
            }}
          >
            <p>{user.isOnline ? Online.ONLINE : Online.OFFLINE}</p>
          </li>
        )}
        {checkFieldsList.find(el => el.title === 'Аватарка')?.checked && (
          <li>
            <AdminTableInput
              type='text'
              placeholder='Аватарка'
              {...register(`${user.id}.avatarPath`)}
              error={errors[user.id]?.avatarPath}
            />
          </li>
        )}
        {checkFieldsList.find(el => el.title === '№ телефона')?.checked && (
          <li>
            <AdminTableInput
              type='text'
              placeholder='№ телефона'
              {...register(`${user.id}.phone`)}
              error={errors[user.id]?.phone}
            />
          </li>
        )}
        {checkFieldsList.find(el => el.title === 'Заказы')?.checked && (
          <li className={mainCl.special} onClick={onClickUserOrders}>
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
        )}
        {checkFieldsList.find(el => el.title === 'Дата обновления')
          ?.checked && (
          <li className={mainCl.date__element}>
            <p>{dateFormat(user.updatedAt, { withTime: true })}</p>
          </li>
        )}
        {checkFieldsList.find(el => el.title === 'Дата регистрации')
          ?.checked && (
          <li className={mainCl.date__element}>
            <p>{dateFormat(user.createdAt, { withTime: true })}</p>
          </li>
        )}
      </ul>
    </div>
  )
}

export default UserModelRow
