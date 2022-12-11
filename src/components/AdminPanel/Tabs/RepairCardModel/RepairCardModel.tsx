import React, { useLayoutEffect, useRef, useState } from 'react'
import { useGetRepairCardsQuery } from '../../../../api/repairCard.api'
import { useHeaders } from '../../../../hooks/useHeaders'
import { Roles } from '../../../../interfaces/roles.interface'
import { dateFormat } from '../../../../utils/date.format'
import AdminLoader from '../../../UI/AdminLoader/AdminLoader'
import mainCl from '../tabs.module.scss'

const RepairCardModel = () => {
  const headers = useHeaders()
  const { data: cardsData, isLoading } = useGetRepairCardsQuery(headers)
  const slugRef = useRef<HTMLLIElement>(null)
  const titleRef = useRef<HTMLLIElement>(null)
  const updatedAtRef = useRef<HTMLLIElement>(null)
  const createdAtRef = useRef<HTMLLIElement>(null)
  const servicesRef = useRef<HTMLLIElement>(null)

  const [widths, setWidths] = useState({
    slug: 0,
    title: 0,
    updatedAt: 0,
    createdAt: 0,
    services: 0,
  })

  useLayoutEffect(() => {
    setWidths({
      slug: slugRef.current?.offsetWidth || 0,
      title: titleRef.current?.offsetWidth || 0,
      updatedAt: updatedAtRef.current?.offsetWidth || 0,
      createdAt: createdAtRef.current?.offsetWidth || 0,
      services: servicesRef.current?.offsetWidth || 0,
    })
  }, [cardsData])

  return (
    <>
      {isLoading ? (
        <AdminLoader />
      ) : (
        cardsData && (
          <div className={mainCl.wrapper}>
            <div>
              <ul className={mainCl.top__menu}>
                <li>№</li>
                <li ref={slugRef}>Слаг</li>
                <li ref={titleRef}>Название</li>
                <li ref={updatedAtRef}>Дата обновления</li>
                <li ref={createdAtRef}>Дата регистрации</li>
                <li ref={servicesRef}>Услуги</li>
              </ul>
              <ul className={mainCl.content__menu}>
                {cardsData.map(card => (
                  <li key={card.id}>
                    <ul className={mainCl.menu}>
                      <li>{card.id}</li>
                      <li style={{ width: widths.slug }}>{card.slug}</li>
                      <li style={{ width: widths.title }}>{card.title}</li>
                      <li style={{ width: widths.updatedAt }}>
                        {dateFormat(card.updatedAt, { withTime: true })}
                      </li>
                      <li style={{ width: widths.createdAt }}>
                        {dateFormat(card.createdAt, { withTime: true })}
                      </li>
                      <li
                        className={mainCl.special}
                        style={{ width: widths.services }}
                      >
                        <p>{card._count.services}</p>
                        <p>Услуги</p>
                      </li>
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      )}
    </>
  )
}

export default RepairCardModel
