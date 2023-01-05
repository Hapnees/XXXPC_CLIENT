import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useHeaders } from '@hooks/useHeaders'
import { AdminLoader } from '@components/UI/AdminUi'
import mainCl from '../tabs.module.scss'
import { checkNewUsers } from './checkNewUsers'
import UserModelRow from './UserModelRow/UserModelRow'
import { useSetValue, useSetErrors } from './hooks/index'
import { getChanges } from './getChanges.util'
import {
  useDeleteUsersMutation,
  useLazyGetUsersQuery,
  useUpdateUsersMutation,
} from '@api/user.api'
import { Roles, RolesView } from '@interfaces/roles.interface'
import {
  CreateButton,
  DeleteButton,
  UpdateButton,
} from '@components/UI/AdminUi/Buttons'
import OrderModel from '../OrderModel/OrderModel'
import SpecialInput from '@components/UI/AdminUi/AdminSpecialInput/SpecialInput'
import { HiSearch } from 'react-icons/hi'
import { IUserUpdate } from '@interfaces/adminInterfaces/user'
import { AdminError } from '@interfaces/adminInterfaces/error.interface'
import { userMenuTitles } from '../tabs.titles'
import customToast from '@utils/customToast'
import AdminFieldsPopup from '@components/AdminPanel/AdminFieldsPopup/AdminFieldsPopup'
import { IFieldMenuElement } from '@interfaces/adminInterfaces/fieldMenuElement.interface'
import Pagination from '@components/AdminPanel/Pagination/Pagination'

const UserModel = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const searchRef = useRef<HTMLInputElement>(null)
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

  const [checkList, setCheckList] = useState<number[]>([])

  const [isViewsOrders, setIsViewOrders] = useState(false)
  const [currentUser, setCurrentUser] = useState<IUserUpdate>()

  const [newUsers, setNewUsers] = useState<IUserUpdate[]>([])
  const [allUsers, setAllUsers] = useState<IUserUpdate[]>([])
  const headers = useHeaders()

  const [getUsers, { data: getUsersData, isLoading }] = useLazyGetUsersQuery()

  const getAndSetUsers = useCallback(
    () =>
      getUsers({ headers, search: searchRef.current?.value, page: currentPage })
        .unwrap()
        .then(response => setAllUsers(response.data)),
    [getUsers]
  )

  const [usersErrors, setUsersErrors] = useState<AdminError[]>(
    [] as AdminError[]
  )

  const [checkFields, setCheckFields] = useState<IFieldMenuElement[]>(
    userMenuTitles
      .map(el => ({ title: el, checked: true }))
      .map(el => ({
        ...el,
        checked:
          el.title === 'Дата регистрации' || el.title === 'Дата обновления'
            ? false
            : true,
      }))
  )

  //Получаем и сетаем пользователей
  useEffect(() => {
    getAndSetUsers()
  }, [currentPage])

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
      customToast.error('Изменений нет!')
      return
    }

    updateUsers({ body: { data: changeDataArray }, headers })
      .unwrap()
      .then(response => {
        customToast.success(response.message)
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
      roleView: RolesView.USER,
      role: Roles.USER,
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
      .then(response => customToast.success(response.message))

    setCheckList([])
  }

  const onClickUserOrders = (user: IUserUpdate) => {
    setCurrentUser(user)
    setIsViewOrders(true)
  }

  const onKeyDownEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      getAndSetUsers()
    }
  }

  return (
    <>
      {isLoading || isLoadingUpdateUsers || isLoadingDeleteUsers ? (
        <AdminLoader />
      ) : isViewsOrders ? (
        <OrderModel
          userId={currentUser?.id}
          username={currentUser?.username}
          toBack={() => setIsViewOrders(false)}
        />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col items-center'
        >
          <div>
            <div className='flex items-center mb-2 ml-2'>
              <div className='flex items-center gap-2'>
                <p className='text-[20px]'>Пользователи</p>
                <UpdateButton />
                <CreateButton onClickCreate={onClickCreate} />
                <DeleteButton onClickDelete={onClickDelete} />
                <div className='flex items-center gap-2'>
                  <div className='w-[400px]'>
                    <SpecialInput
                      placeholder='Поиск пользователя'
                      ref={searchRef}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        if (searchRef.current?.value)
                          searchRef.current.value = event.target.value
                      }}
                      onKeyDown={event => onKeyDownEnter(event)}
                    />
                  </div>
                  <HiSearch
                    className='bg-[#434e62] w-[70px] h-[35px] p-[6px] rounded-md cursor-pointer'
                    onClick={getAndSetUsers}
                  />
                </div>
                {/* <AdminFieldsPopup
                  checkFields={checkFields}
                  setCheckFields={setCheckFields}
                /> */}
              </div>
            </div>
            <div className={mainCl.container__menu}>
              <ul className={mainCl.top__menu}>
                {checkFields
                  .filter(el => el.checked)
                  .map((el, idx) => (
                    <li key={idx}>{el.title}</li>
                  ))}
              </ul>
              <ul className=''>
                {allUsers?.map(user => (
                  <li key={user.id}>
                    <UserModelRow
                      user={user}
                      key={user.id}
                      register={register}
                      errors={errors}
                      setCheckList={setCheckList}
                      checkList={checkList}
                      checkFieldsList={checkFields}
                      onClickUserOrders={() => onClickUserOrders(user)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Pagination
            totalCount={getUsersData?.totalCount || 0}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </form>
      )}
    </>
  )
}

export default UserModel
