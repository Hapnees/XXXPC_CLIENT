import React, { FC, SetStateAction } from 'react'
import cl from './OrderMenuTitle.module.scss'
import { SortDirect } from '@interfaces/order/order-sort.enum'
import { MdOutlineDoubleArrow } from 'react-icons/md'

interface IProps {
  check: boolean
  sortDirect: SortDirect | undefined
  setSortDirect: React.Dispatch<SetStateAction<SortDirect | undefined>>
  title: string
}

const OrderMenuTitle: FC<IProps> = ({
  check,
  setSortDirect,
  sortDirect,
  title,
}) => {
  return (
    <div
      className={cl.wrapper}
      style={{
        backgroundColor: check ? '#6938627e' : '',
      }}
    >
      {check && (
        <MdOutlineDoubleArrow
          className={cl.arrow__up}
          style={{
            opacity: sortDirect === SortDirect.UP ? 1 : '',
          }}
          onClick={event => {
            event.stopPropagation()
            setSortDirect(SortDirect.UP)
          }}
        />
      )}
      <p>{title}</p>
      {check && (
        <MdOutlineDoubleArrow
          className={cl.arrow__down}
          style={{
            opacity: sortDirect === SortDirect.DOWN ? 1 : '',
          }}
          onClick={event => {
            event.stopPropagation()
            setSortDirect(SortDirect.DOWN)
          }}
        />
      )}
    </div>
  )
}

export default OrderMenuTitle
