import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useLazyGetOrdersQuery, useOrderDeleteMutation } from '@api/order.api'
import { useHeaders } from '@hooks/useHeaders'
import { AdminLoader } from '@components/UI/AdminUi/index'
import mainCl from '../tabs.module.scss'
import BackButton from '@components/UI/AdminUi/Buttons/BackButton/BackButton'
import { DeleteButton } from '@components/UI/AdminUi/Buttons'
import OrderModelRow from './OrderModelRow/OrderModelRow'
import ModalWindow from '@components/UI/ModalWindow/ModalWindow'
import { CSSTransition } from 'react-transition-group'
import OrderModelCreateWindow from './OrderModelCreateWindow/OrderModelCreateWindow'
import { OrdersGetResponse } from '@interfaces/adminInterfaces/order'
import customToast from '@utils/customToast'
import { IFieldMenuElement } from '@interfaces/adminInterfaces/fieldMenuElement.interface'
import AdminFieldsPopup from '@components/AdminPanel/AdminFieldsPopup/AdminFieldsPopup'
import Pagination from '@components/AdminPanel/Pagination/Pagination'
import { sortTitles, sortTitlesView } from './OrderModel.interface'
import { SortDirect } from '@interfaces/order/order-sort.enum'
import { MdOutlineDoubleArrow } from 'react-icons/md'
import SearchInputWithButton from '@components/AdminPanel/SearchInputWithButton/SearchInputWithButton'

interface IProps {
  userId?: number
  username?: string
  toBack?: () => void
}

const OrderModel: FC<IProps> = ({ userId, username, toBack }) => {
  const [sortTitle, setSortTitle] = useState<sortTitles>()
  const [sortDirect, setSortDirect] = useState<SortDirect>()

  const [currentPage, setCurrentPage] = useState(1)
  const searchRef = useRef<HTMLInputElement>(null)
  const headers = useHeaders()
  const [getOrders, { data: ordersData, isLoading }] = useLazyGetOrdersQuery()

  const getOrdersWithParams = useCallback(
    () =>
      getOrders({
        id: userId,
        search: searchRef.current?.value,
        st: sortTitle,
        sd: sortDirect,
        page: currentPage,
        headers,
      }),
    [getOrders]
  )

  const [deleteOrders] = useOrderDeleteMutation()

  const [isViewCreateWindow, setIsViewCreateWindow] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<OrdersGetResponse>()
  const [checkList, setCheckList] = useState<number[]>([])

  const [checkFields, setCheckFields] = useState<IFieldMenuElement[]>(
    Object.keys(sortTitles)
      .map(el => ({ title: el, checked: true }))
      .map(el => ({
        ...el,
        checked:
          el.title === sortTitles.DATE_CREATED ||
          el.title === sortTitles.DATE_UPDATED
            ? false
            : true,
      }))
  )

  useEffect(() => {
    getOrdersWithParams()
  }, [])

  const onClickOrder = (order: OrdersGetResponse) => {
    setIsViewCreateWindow(true)
    setCurrentOrder(order)
  }

  const onClickDelete = () => {
    deleteOrders({ body: checkList, headers })
      .unwrap()
      .then(response => customToast.success(response.message))
  }

  const onKeyDownEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      getOrdersWithParams()
    }
  }

  const onClickMenuElement = (title: sortTitles) => {
    if (title === sortTitle) {
      setSortTitle(undefined)
      setSortDirect(undefined)
    } else if (title === sortTitles.PRICE) {
      setSortTitle(title)
      setSortDirect(undefined)
    }
  }

  if (isLoading) return <AdminLoader />

  return (
    <div className={mainCl.wrapper}>
      {!!username && (
        <div className='flex gap-2 text-[20px] mb-4 ml-2'>
          <p>Пользователь</p>
          <p className='text-[#7DD3FC]'>{username}</p>
        </div>
      )}
      <div className={mainCl.panel}>
        <div className='flex gap-2'>
          <p className='text-[20px]'>Заказы</p>
          {toBack && <BackButton onClickBack={toBack} />}
          <DeleteButton onClickDelete={onClickDelete} />
        </div>

        <SearchInputWithButton
          searchRef={searchRef}
          onKeyDownEnter={onKeyDownEnter}
          getDataWithParams={getOrdersWithParams}
        />

        <AdminFieldsPopup
          ruFields={sortTitlesView}
          checkFields={
            userId
              ? checkFields.filter(el => el.title !== sortTitles.NAME)
              : checkFields
          }
          setCheckFields={setCheckFields}
        />
      </div>

      <div className={mainCl.container__menu}>
        <ul className={mainCl.top__menu}>
          {checkFields
            .filter(el => el.checked)
            .filter(el => {
              if (userId) return el.title !== sortTitles.NAME
              return true
            })
            .map((el, idx) => (
              <li
                key={idx}
                onClick={() => onClickMenuElement(el.title as sortTitles)}
                style={{
                  backgroundColor: el.title === sortTitle ? '#2d3748' : '',
                }}
              >
                {el.title === sortTitle && (
                  <MdOutlineDoubleArrow
                    className={mainCl.arrow__up}
                    style={{
                      opacity: sortDirect === SortDirect.UP ? 1 : '',
                    }}
                    onClick={event => {
                      event.stopPropagation()
                      setSortDirect(SortDirect.UP)
                    }}
                  />
                )}
                {sortTitlesView[el.title as keyof typeof sortTitlesView]}
                {el.title === sortTitle && (
                  <MdOutlineDoubleArrow
                    className={mainCl.arrow__down}
                    style={{
                      opacity: sortDirect === SortDirect.DOWN ? 1 : '',
                    }}
                    onClick={event => {
                      event.stopPropagation()
                      setSortDirect(SortDirect.DOWN)
                    }}
                  />
                )}
              </li>
            ))}
        </ul>
        <ul className={mainCl.content__menu}>
          {ordersData?.data.map(order => (
            <li key={order.id} onClick={() => onClickOrder(order)}>
              <OrderModelRow
                checkFieldsList={
                  userId
                    ? checkFields.filter(el => el.title !== sortTitlesView.NAME)
                    : checkFields
                }
                checkList={checkList}
                setCheckList={setCheckList}
                userId={userId}
                order={order}
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

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={ordersData?.totalCount || 0}
      />
    </div>
  )
}
export default OrderModel
