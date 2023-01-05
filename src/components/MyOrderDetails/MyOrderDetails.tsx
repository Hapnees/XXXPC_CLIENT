import React, { FC, useState } from 'react'
import { OrderStatusView } from '@interfaces/adminInterfaces/order/order-status.enum'
import { OrderGetResponse } from '@interfaces/order/order-get-response.interface'
import { IoClose } from 'react-icons/io5'
import cl from './MyOrderDetails.module.scss'
import { useGetNoteQuery } from '@api/order.api'

interface IProps {
  toBack: () => void
  order: OrderGetResponse
}

const MyOrderDetails: FC<IProps> = ({ toBack, order }) => {
  const [isViewNote, setIsViewNote] = useState(false)
  const { data: noteData } = useGetNoteQuery(order.id)

  return (
    <div className={cl.wrapper}>
      <div
        className={cl.container}
        style={{
          transform: isViewNote ? 'translateX(-200px)' : '',
          zIndex: 500,
        }}
      >
        <IoClose
          className='absolute right-2 top-2 p-1 cursor-pointer'
          size={30}
          onClick={toBack}
        />
        <div className='flex flex-col gap-2 mb-2'>
          <div className={cl.field}>
            <p>Заказ </p>
            <p className='text-[#de4fc8]'>№ {order.id}</p>
          </div>
          <div className={cl.field}>
            <p>Услуга</p>
            <p className='text-[#de4fc8]'>{order.service.title}</p>
          </div>
          <div className={cl.field}>
            {order.priceRange?.length ? (
              <p>Окончательная стоимость не рассчитана</p>
            ) : (
              !!order.price && (
                <>
                  <p>Стомиость</p>
                  <p className='text-[#de4fc8]'>{order.price} руб</p>
                </>
              )
            )}
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className={cl.field}>
            <p>
              {OrderStatusView[order.status as keyof typeof OrderStatusView]}
            </p>
          </div>
          <div className='w-full'>
            <p className={cl.comment__title}>Комментарий</p>
            <p className={cl.comment}>{order.comment}</p>
          </div>
        </div>
        <div className='flex flex-col gap-2 my-5'>
          <button
            className={cl.button}
            onClick={() => setIsViewNote(!isViewNote)}
          >
            Открыть/закрыть записку
          </button>
        </div>
      </div>

      <div
        className={cl.container}
        style={{
          position: 'absolute',
          opacity: isViewNote ? 1 : 0,
          transform: isViewNote ? 'translateX(320px)' : '',
        }}
      >
        <IoClose
          className='absolute right-2 top-2 p-1 cursor-pointer'
          size={30}
          onClick={() => setIsViewNote(false)}
        />
        <div className='mb-2'>
          <p className={cl.field}>Записка к заказу</p>
        </div>

        <p className={cl.note}>{noteData?.note}</p>
      </div>
    </div>
  )
}

export default MyOrderDetails
