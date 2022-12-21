import React, { FC } from 'react'

interface IProps {
  title: string
}

const ServiceCreate: FC<IProps> = ({ title }) => {
  return (
    <div>
      <p className='text-[30px]'>
        Услуги карточки <span className='text-[#7DD3FC]'>{title}</span>
      </p>

      <div></div>
    </div>
  )
}

export default ServiceCreate
