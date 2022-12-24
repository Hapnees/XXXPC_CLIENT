import React, { FC, useLayoutEffect, useRef, useState } from 'react'
import { useGetOrdersQuery, useOrderDeleteMutation } from '@api/order.api'
import { useHeaders } from '@hooks/useHeaders'
import { AdminLoader } from '@components/UI/AdminUi/index'
import mainCl from '../tabs.module.scss'
import BackButton from '@components/UI/AdminUi/Buttons/BackButton/BackButton'
import { DeleteButton } from '@components/UI/AdminUi/Buttons'
import OrderModelRow from './OrderModelRow/OrderModelRow'
import ModalWindow from '@components/UI/ModalWindow/ModalWindow'
import { CSSTransition } from 'react-transition-group'
import OrderModelCreateWindow from './OrderModelCreateWindow/OrderModelCreateWindow'
import { OrdersGetResponse } from '@interfaces/adminInterfaces'
import { toast } from 'react-toastify'

interface IProps {
  userId?: number
  username?: string
}

const OrderModel: FC<IProps> = ({ userId, username }) => {
  const headers = useHeaders()
  const { data: ordersData, isLoading } = useGetOrdersQuery({
    id: userId,
    headers,
  })

  const [deleteOrders] = useOrderDeleteMutation()

  const checkRef = useRef<HTMLLIElement>(null)
  const idRef = useRef<HTMLLIElement>(null)
  const commentRef = useRef<HTMLLIElement>(null)
  const statusRef = useRef<HTMLLIElement>(null)
  const pricesRef = useRef<HTMLLIElement>(null)
  const updatedAtRef = useRef<HTMLLIElement>(null)
  const createdAtRef = useRef<HTMLLIElement>(null)
  const usernameRef = useRef<HTMLLIElement>(null)
  const serviceTitleRef = useRef<HTMLLIElement>(null)

  const [isViewCreateWindow, setIsViewCreateWindow] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<OrdersGetResponse>()
  const [checkList, setCheckList] = useState<number[]>([])

  const [widths, setWidths] = useState({
    check: 0,
    id: 0,
    comment: 0,
    status: 0,
    prices: 0,
    updatedAt: 0,
    createdAt: 0,
    username: 0,
    serviceTitle: 0,
  })

  useLayoutEffect(() => {
    setWidths({
      check: checkRef.current?.offsetWidth || 0,
      id: idRef.current?.offsetWidth || 0,
      comment: commentRef.current?.offsetWidth || 0,
      status: statusRef.current?.offsetWidth || 0,
      prices: pricesRef.current?.offsetWidth || 0,
      updatedAt: updatedAtRef.current?.offsetWidth || 0,
      createdAt: createdAtRef.current?.offsetWidth || 0,
      username: usernameRef.current?.offsetWidth || 0,
      serviceTitle: serviceTitleRef.current?.offsetWidth || 0,
    })
  }, [ordersData])

  const onClickOrder = (order: OrdersGetResponse) => {
    setIsViewCreateWindow(true)
    setCurrentOrder(order)
  }

  const onClickDelete = () => {
    deleteOrders({ body: checkList, headers })
      .unwrap()
      .then(response => toast.success(response.message))
  }

  return (
    <>
      {isLoading ? (
        <AdminLoader />
      ) : (
        <div>
          {!!username && (
            <div className='flex gap-2 text-[20px] mb-4 ml-2'>
              <p>Пользователь</p>
              <p className='text-[#7DD3FC]'>{username}</p>
            </div>
          )}
          <div className='flex gap-2 mb-2 ml-2'>
            <p className='text-[20px]'>Заказы</p>
            <BackButton onClickBack={() => {}} />
            <DeleteButton onClickDelete={onClickDelete} />
          </div>
          <div className={mainCl.container__menu}>
            <ul className={mainCl.top__menu}>
              <li ref={checkRef}>C</li>
              <li ref={idRef}>№</li>
              <li ref={commentRef}>Комментарий</li>
              <li ref={statusRef}>Статус</li>
              <li ref={pricesRef}>Цена</li>
              <li ref={updatedAtRef}>Дата обновления</li>
              <li ref={createdAtRef}>Дата регистрации</li>
              {!userId && <li ref={usernameRef}>Имя заказчика</li>}
              <li ref={serviceTitleRef}>Название услуги</li>
            </ul>
            <ul className={mainCl.content__menu}>
              {ordersData?.map(order => (
                <li key={order.id} onClick={() => onClickOrder(order)}>
                  <OrderModelRow
                    checkList={checkList}
                    setCheckList={setCheckList}
                    userId={userId}
                    order={order}
                    widths={widths}
                  />
                </li>
              ))}
            </ul>
          </div>
          <CSSTransition
            in={isViewCreateWindow}
            timeout={300}
            classNames='popup'
            unmountOnExit
          >
            <ModalWindow>
              {currentOrder && (
                <OrderModelCreateWindow
                  order={currentOrder}
                  username={username}
                  toClose={() => setIsViewCreateWindow(false)}
                />
              )}
            </ModalWindow>
          </CSSTransition>
        </div>
      )}
    </>
  )
}
export default OrderModel
