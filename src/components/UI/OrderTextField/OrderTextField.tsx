import React, { forwardRef } from 'react'
import { IOrderTextField } from './OrderTextField.interface'
import cl from './OrderTextField.module.scss'

const OrderTextField = forwardRef<HTMLTextAreaElement, IOrderTextField>(
  (props, ref) => {
    return (
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2'>
          <p className={cl.title}>Комментарий к заказу</p>
          <textarea className={cl.textarea} {...props} ref={ref} />
        </div>
      </div>
    )
  }
)

OrderTextField.displayName = 'OrderTextField'

export default OrderTextField
