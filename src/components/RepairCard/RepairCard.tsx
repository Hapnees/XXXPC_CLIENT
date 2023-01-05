import React, { FC } from 'react'
import { RepairCardsGetResponse } from '@interfaces/adminInterfaces/repair-card'
import { BsGearFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import cl from './RepairCard.module.scss'

interface IProps {
  card: RepairCardsGetResponse
}

const RepairCard: FC<IProps> = ({
  card: { title, iconPath, description, menus, slug },
}) => {
  return (
    <div className={cl.card}>
      <div>
        <div className={cl.card__top__content}>
          <img
            src={iconPath || ''}
            alt=''
            className='w-[50px] h-[50px] object-cover'
          />
          <p className='text-[20px]'>{title}</p>
        </div>
        <p className={cl.description}>{description}</p>
      </div>

      <div className={cl.body}>
        <div>
          <ul className={cl.menus}>
            {menus?.map(menu => (
              <li key={menu.id}>
                <p className={cl.menu__title}>{menu.title}</p>
                <ul className='flex flex-col gap-1'>
                  {menu?.paragraphs?.map(paragraph => (
                    <li
                      key={paragraph.id}
                      className='text-[#81ffe4ce] flex items-center gap-2'
                    >
                      <BsGearFill className='shrink-0' />
                      <p>{paragraph.title}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link to={`${slug}`}>
        <button className={cl.button}>Подробнее</button>
      </Link>
    </div>
  )
}

export default RepairCard
