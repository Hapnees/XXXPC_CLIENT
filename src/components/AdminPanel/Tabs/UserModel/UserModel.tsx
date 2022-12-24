import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useHeaders } from '@hooks/useHeaders'
import { AdminLoader } from '@components/UI/AdminUi'
import mainCl from '../tabs.module.scss'
import { checkNewUsers } from './checkNewUsers'
import UserModelRow from './UserModelRow/UserModelRow'
import { UserModelWidths } from './fields.type'
import { useSetValue, useSetErrors } from './hooks/index'
import { getChanges } from './getChanges.util'
import { AdminError, IUserUpdate } from '@interfaces/adminInterfaces'
import {
  useDeleteUsersMutation,
  useGetUsersQuery,
  useUpdateUsersMutation,
} from '@api/user.api'
import { Roles, RolesResponse } from '@interfaces/roles.interface'
import {
  CreateButton,
  DeleteButton,
  UpdateButton,
} from '@components/UI/AdminUi/Buttons'
import OrderModel from '../OrderModel/OrderModel'

const UserModel = () => {
  const [deleteUsers, { isLoading: isLoadingDeleteUsers }] =
    useDeleteUsersMutation()
  const [updateUsers, { isLoading: isLoadingUpdateUsers }] =
    useUpdateUsersMutation()
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    setError,
  } = useForm<IUserUpdate[]>({ mode: 'onChange' })
  const [widths, setWidths] = useState<UserModelWidths>({} as UserModelWidths)

  const [checkList, setCheckList] = useState<number[]>([])

  const [isViewsOrders, setIsViewOrders] = useState(false)
  const [currentUser, setCurrentUser] = useState<IUserUpdate>()

  const checkRef = useRef<HTMLLIElement>(null)
  const idRef = useRef<HTMLLIElement>(null)
  const usernameRef = useRef<HTMLLIElement>(null)
  const emailRef = useRef<HTMLLIElement>(null)
  const roleRef = useRef<HTMLLIElement>(null)
  const hashRef = useRef<HTMLLIElement>(null)
  const hashedRtRef = useRef<HTMLLIElement>(null)
  const avatarPathRef = useRef<HTMLLIElement>(null)
  const phoneRef = useRef<HTMLLIElement>(null)
  const ordersRef = useRef<HTMLLIElement>(null)
  const updatedAtRef = useRef<HTMLLIElement>(null)
  const createdAtRef = useRef<HTMLLIElement>(null)

  const [newUsers, setNewUsers] = useState<IUserUpdate[]>([])
  const [allUsers, setAllUsers] = useState<IUserUpdate[]>([])
  const headers = useHeaders()
  const { data: usersGetData, isLoading } = useGetUsersQuery(headers)
  const [usersErrors, setUsersErrors] = useState<AdminError[]>(
    [] as AdminError[]
  )

  // Получаем пользователей
  useEffect(() => {
    if (!usersGetData) return

    setAllUsers(usersGetData)
  }, [usersGetData])

  // Сетаем ширины полей
  useLayoutEffect(() => {
    setWidths({
      check: checkRef.current?.offsetWidth || 0,
      id: idRef.current?.offsetWidth || 0,
      username: usernameRef.current?.offsetWidth || 0,
      email: emailRef.current?.offsetWidth || 0,
      role: roleRef.current?.offsetWidth || 0,
      hash: hashRef.current?.offsetWidth || 0,
      hashedRt: hashedRtRef.current?.offsetWidth || 0,
      avatarPath: avatarPathRef.current?.offsetWidth || 0,
      phone: phoneRef.current?.offsetWidth || 0,
      orders: ordersRef.current?.offsetWidth || 0,
      updatedAt: updatedAtRef.current?.offsetWidth || 0,
      createdAt: createdAtRef.current?.offsetWidth || 0,
    })
  }, [allUsers])

  // Сетаем значения при получении данных
  useSetValue(setValue, allUsers)

  // Сетаем ошибки при их получении с бека
  useSetErrors(setError, usersErrors)

  const onSubmit: SubmitHandler<IUserUpdate[]> = async data => {
    if (!allUsers) return

    // Массив с айди новых созданных пользователей
    const newUsersIds = newUsers.map(el => el.id)
    const usersData = allUsers.filter(el => !newUsersIds.includes(el.id))

    const allDataArray = Object.values(data).reverse()

    // Исключаем из массива созданных пользователей(т.к этот массив предназначен для отслеживания изменений)
    const dataArray = allDataArray.filter(el => !newUsersIds.includes(el.id))

    // Массив созданных пользователей
    const newUsersArray = allDataArray.filter(el => newUsersIds.includes(el.id))

    // Массив с айди пользователей, в полях которых допущена ошибка
    const errorsIds = usersErrors.map(el => el.id)

    // Массив, содержащий созданных пользователей, в полях которых нет ошибок
    const successIds = errorsIds.length
      ? newUsersIds.filter(el => !errorsIds.includes(el))
      : []

    // "Сканируем" изменнеия
    const changeDataArray = getChanges(dataArray, usersData)

    // Массив "корректных пользователей"
    /* Нужен для того, чтобы созданные пользователи не учитывались при повторном обновлении */
    const correctNewUsersArray = newUsersArray.filter(
      user => !successIds.includes(user.id)
    )

    // Проверяем новых созданных пользователей
    checkNewUsers(correctNewUsersArray, changeDataArray)

    if (!changeDataArray.length) {
      toast.error('Изменений нет!')
      return
    }

    updateUsers({ body: { data: changeDataArray }, headers })
      .unwrap()
      .then(response => {
        toast.success(response.message)
        setNewUsers([])
      })
      .catch(reject => {
        setUsersErrors(reject.data)
      })
  }

  const onClickCreate = () => {
    const tempId = Math.floor(Math.random() * 99 - 1)
    const newUser = {
      id: tempId,
      roleView: Roles.USER,
      role: RolesResponse.USER,
    } as IUserUpdate
    setNewUsers(prev => [...prev, newUser])
    setAllUsers(prev => [...prev, newUser])
    setValue(`${tempId}.id`, tempId)
  }

  const onClickDelete = () => {
    // Массив с айди новых созданных пользователей
    const newUsersIds = newUsers.map(el => el.id)
    const idsForRequest = checkList.filter(el => !newUsersIds.includes(el))

    deleteUsers({ body: { ids: idsForRequest }, headers })
      .unwrap()
      .then(response => toast.success(response.message))

    setCheckList([])
  }

  const onClickUserOrders = (user: IUserUpdate) => {
    setCurrentUser(user)
    setIsViewOrders(true)
  }

  return (
    <>
      {isLoading || isLoadingUpdateUsers || isLoadingDeleteUsers ? (
        <AdminLoader />
      ) : isViewsOrders ? (
        <OrderModel userId={currentUser?.id} username={currentUser?.username} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex gap-2 mb-2 ml-2'>
            <p className='text-[20px]'>Пользователи</p>
            <UpdateButton />
            <CreateButton onClickCreate={onClickCreate} />
            <DeleteButton onClickDelete={onClickDelete} />
          </div>
          <div className={mainCl.container__menu}>
            <ul className={mainCl.top__menu}>
              <li ref={checkRef}>C</li>
              <li ref={idRef}>№</li>
              <li ref={usernameRef}>Имя пользователя</li>
              <li ref={emailRef}>Почта</li>
              <li ref={roleRef}>Роль</li>
              <li ref={hashRef}>Пароль</li>
              <li ref={hashedRtRef}>Токен обновления</li>
              <li ref={avatarPathRef}>Аватарка</li>
              <li ref={phoneRef}>№ телефона</li>
              <li ref={ordersRef}>Заказы</li>
              <li ref={updatedAtRef}>Дата обновления</li>
              <li ref={createdAtRef}>Дата регистрации</li>
            </ul>
            <ul className={mainCl.content__menu}>
              {allUsers?.map(user => (
                <li key={user.id}>
                  <UserModelRow
                    user={user}
                    key={user.id}
                    widths={widths}
                    register={register}
                    errors={errors}
                    setCheckList={setCheckList}
                    checkList={checkList}
                    onClickUserOrders={() => onClickUserOrders(user)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </form>
      )}
    </>
  )
}

export default UserModel
