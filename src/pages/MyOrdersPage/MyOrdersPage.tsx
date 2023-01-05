import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLazyGetOrderByUserQuery } from '@api/order.api'
import Loader from '@components/UI/Loader/Loader'
import { useHeaders } from '@hooks/index'
import { dateFormat, pricesFormat } from '@utils/index'
import cl from './MyOrdersPage.module.scss'
import {
  OrderStatus,
  OrderStatusView,
} from '@interfaces/adminInterfaces/order/order-status.enum'
import ModalWindow from '@components/UI/ModalWindow/ModalWindow'
import MyOrderDetails from '@components/MyOrderDetails/MyOrderDetails'
import { CSSTransition } from 'react-transition-group'
import { OrderGetResponse } from '@interfaces/order/order-get-response.interface'
import { FaSearch } from 'react-icons/fa'
import Pagination from '@components/Pagination/Pagination'
import { SortDirect as SortDirect } from '@interfaces/order/order-sort.enum'
import OrderMenuTitle from '@components/OrderMenuTitle/OrderMenuTitle'
import { IoClose } from 'react-icons/io5'
import { TiRefresh } from 'react-icons/ti'

enum SortTitles {
  EMPTY = '',
  SERVICE = 'service',
  PRICE = 'price',
  STATUS = 'status',
  DATE = 'date',
  ID = 'id',
}

const MyOrdersPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const searchRef = useRef<HTMLInputElement>(null)
  const headers = useHeaders()
  const [getOrders, { data: orderData, isLoading }] =
    useLazyGetOrderByUserQuery()

  const [sortTitle, setSortTitle] = useState<SortTitles>()
  const [sortDirect, setSortDirect] = useState<SortDirect>()

  const [isOpenStatusWindow, setIsOpenStatusWindow] = useState(false)
  const [filterStatus, setFilterStatus] = useState<OrderStatus>()

  const getOrdersWithParams = useCallback(
    () =>
      getOrders({
        headers,
        page: currentPage,
        search: searchRef.current?.value,
        st: sortTitle,
        sd: sortDirect,
        fs: filterStatus,
      }),
    [getOrders, sortDirect, sortTitle, filterStatus]
  )

  const style = (status: OrderStatus) => {
    const color = () => {
      switch (status) {
        case OrderStatus.PENDING:
          return 'rgba(208, 0, 180, 0.224)'
        case OrderStatus.PROCESSING:
          return 'rgba(160, 0, 208, 0.224)'
        case OrderStatus.COMPLETED:
          return 'rgba(190, 26, 199, 0.403)'
        case OrderStatus.STOPPED:
          return 'rgba(208, 0, 90, 0.224)'
        case OrderStatus.REJECTED:
          return 'rgba(208, 0, 35, 0.432)'
        default:
          return ''
      }
    }

    return { backgroundColor: color() }
  }

  const [isDetailsView, setIsDetailsView] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<OrderGetResponse>()

  const onKeyDownEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      getOrdersWithParams()
    }
  }

  const onClickMenuTitle = (title: keyof typeof SortTitles) => {
    if (SortTitles[title] === sortTitle) setSortTitle(SortTitles.EMPTY)
    else setSortTitle(SortTitles[title])

    setSortDirect(undefined)
  }

  // Получаем заказы
  useEffect(() => {
    if (sortTitle !== undefined && sortDirect === undefined) return

    getOrdersWithParams()
  }, [currentPage, sortDirect, filterStatus])

  return (
    <div className='flex flex-col items-center'>
      <div>
        <div className='flex items-center gap-4 mb-[20px]'>
          <p className={cl.top__title}>Мои заказы</p>

          <div className='relative'>
            <input
              type='text'
              placeholder='Название услуги'
              className={cl.input}
              onKeyDown={event => onKeyDownEnter(event)}
              onChange={event =>
                searchRef.current &&
                (searchRef.current.value = event.target.value)
              }
              ref={searchRef}
            />

            <FaSearch
              className='absolute right-[14px] top-[10px] text-[#ffd2f8] cursor-pointer'
              onClick={getOrdersWithParams}
            />
          </div>
        </div>

        <div>
          <ul className={cl.title__menu}>
            <li
              className={cl.service}
              onClick={() => onClickMenuTitle('SERVICE')}
            >
              <OrderMenuTitle
                check={sortTitle === SortTitles.SERVICE}
                sortDirect={sortDirect}
                setSortDirect={setSortDirect}
                title='Услуга'
              />
            </li>

            <li className={cl.price} onClick={() => onClickMenuTitle('PRICE')}>
              <OrderMenuTitle
                check={sortTitle === SortTitles.PRICE}
                sortDirect={sortDirect}
                setSortDirect={setSortDirect}
                title='Стоимость'
              />
            </li>

            <li
              className={cl.status}
              style={{
                backgroundColor: filterStatus ? '#6938627e' : '',
              }}
            >
              <div
                className={cl.status__content}
                onClick={() => setIsOpenStatusWindow(!isOpenStatusWindow)}
              >
                <CSSTransition
                  in={isOpenStatusWindow}
                  timeout={300}
                  classNames='alert'
                  unmountOnExit
                >
                  <div className='absolute bottom-16 flex items-center bg-[#482743] py-1 pl-1 rounded-md'>
                    <TiRefresh
                      className='p-2'
                      size={45}
                      onClick={() => setFilterStatus(undefined)}
                    />
                    <ul className={cl.status__menu}>
                      {Object.keys(OrderStatus).map((el, idx) => (
                        <li
                          key={idx}
                          onClick={() => {
                            setFilterStatus(
                              OrderStatus[el as keyof typeof OrderStatus]
                            )
                          }}
                        >
                          {OrderStatusView[el as keyof typeof OrderStatusView]}
                        </li>
                      ))}
                    </ul>
                    <IoClose className='p-2' size={45} />
                  </div>
                </CSSTransition>
                <p>{filterStatus ? OrderStatusView[filterStatus] : 'Статус'}</p>
              </div>
            </li>

            <li className={cl.date}>Дата</li>
            <li className={cl.comment}>Комментарий</li>
            <li className={cl.id}>Идентификатор</li>
          </ul>
          {/* MAIN MENU */}
          {isLoading ? (
            <Loader />
          ) : (
            orderData && (
              <ul className={cl.menu}>
                {orderData?.data.length ? (
                  orderData.data.map(order => (
                    <li
                      key={order.id}
                      onClick={() => {
                        setCurrentOrder(order)
                        setIsDetailsView(true)
                      }}
                    >
                      <div className={cl.service__menu}>
                        <p className={cl.service}>{order.service.title}</p>
                        <div className={cl.price__values}>
                          {order.price ? (
                            <p>{order.price} руб</p>
                          ) : (
                            order.priceRange?.length && (
                              <p>{pricesFormat(order.priceRange)}</p>
                            )
                          )}
                        </div>
                        <p
                          className={cl.status}
                          style={style(order.status as OrderStatus)}
                        >
                          {
                            OrderStatusView[
                              order.status as keyof typeof OrderStatusView
                            ]
                          }
                        </p>
                        <p className={cl.date}>{dateFormat(order.createdAt)}</p>
                        <p className={cl.comment}>{order.comment}</p>
                        <p className={cl.id}>{order.id}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className='mt-8 text-[22px] text-[#ffdaf9] text-center'>
                    Заказов не найдено
                  </p>
                )}
              </ul>
            )
          )}
        </div>
      </div>
      <Pagination
        totalCount={orderData?.totalCount || 0}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <CSSTransition
        in={isDetailsView}
        timeout={300}
        classNames='popup'
        unmountOnExit
      >
        <ModalWindow>
          {currentOrder && (
            <MyOrderDetails
              toBack={() => setIsDetailsView(false)}
              order={currentOrder}
            />
          )}
        </ModalWindow>
      </CSSTransition>
    </div>
  )
}

export default MyOrdersPage
