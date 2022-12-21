import React, { useLayoutEffect, useRef, useState } from 'react'
import { useAdminGetRepairCardsQuery } from '@api/repairCard.api'
import { useHeaders } from '@hooks/useHeaders'
import { AdminLoader } from '@components/UI/AdminUi/index'
import mainCl from '../tabs.module.scss'
import { TypeRepairCardModel } from './fields.type'
import ButtonLine from '@components/UI/AdminUi/ButtonLine/ButtonLine'
import RepairCardModelRow from './RepairCardModelRow/RepairCardModelRow'
import RepairCardCreate from './RepairCardCreate/RepairCardCreate'
import { RepairCardsGetResponse } from '@interfaces/adminInterfaces'
import ServiceCreate from '../ServiceModel/ServiceCreate/ServiceCreate'

export enum CurrentWindowRCM {
  LIST = 'LIST',
  CREATE_MODEL = 'CREATE_MODEL',
  CREATE_SERVICE = 'CREATE_SERVICE',
}

const RepairCardModel = () => {
  const [checkList, setCheckList] = useState<number[]>([])

  const headers = useHeaders()
  const {
    data: cardsData,
    isLoading,
    refetch,
  } = useAdminGetRepairCardsQuery(headers)
  const checkRef = useRef<HTMLLIElement>(null)
  const idRef = useRef<HTMLLIElement>(null)
  const iconRef = useRef<HTMLLIElement>(null)
  const titleRef = useRef<HTMLLIElement>(null)
  const slugRef = useRef<HTMLLIElement>(null)
  const updatedAtRef = useRef<HTMLLIElement>(null)
  const createdAtRef = useRef<HTMLLIElement>(null)
  const servicesRef = useRef<HTMLLIElement>(null)

  const [currentCard, setCurrentCard] = useState<RepairCardsGetResponse>()
  const [currentWindow, setCurrentWindow] = useState<CurrentWindowRCM>(
    CurrentWindowRCM.LIST
  )
  const [widths, setWidths] = useState<TypeRepairCardModel>(
    {} as TypeRepairCardModel
  )

  const onClickCreate = (event: React.MouseEvent) => {
    setCurrentWindow(CurrentWindowRCM.CREATE_MODEL)
  }

  const onClickDelete = (event: React.MouseEvent) => {
    //TODO: сделай кнопку удаления
  }

  // Сетаем длины элементов
  useLayoutEffect(() => {
    setWidths({
      check: checkRef.current?.offsetWidth || 0,
      id: idRef.current?.offsetWidth || 0,
      title: titleRef.current?.offsetWidth || 0,
      slug: slugRef.current?.offsetWidth || 0,
      icon: iconRef.current?.offsetWidth || 0,
      updatedAt: updatedAtRef.current?.offsetWidth || 0,
      createdAt: createdAtRef.current?.offsetWidth || 0,
      services: servicesRef.current?.offsetWidth || 0,
    })
  }, [cardsData, currentWindow])

  return (
    <>
      {currentWindow === CurrentWindowRCM.CREATE_MODEL ? (
        <RepairCardCreate
          id={currentCard?.id || 0}
          setCurrentWindow={setCurrentWindow}
          repairCardModelRefetch={refetch}
        />
      ) : currentWindow === CurrentWindowRCM.CREATE_SERVICE ? (
        <ServiceCreate title={currentCard?.title || ''} />
      ) : isLoading ? (
        <AdminLoader />
      ) : (
        <form>
          <div className='mb-2'>
            <ButtonLine
              title='Карточки ремонта'
              onClickCreate={onClickCreate}
              onClickDelete={onClickDelete}
            />
          </div>
          <div className={mainCl.container__menu}>
            <ul className={mainCl.top__menu}>
              <li ref={checkRef}>C</li>
              <li ref={idRef}>№</li>
              <li ref={titleRef}>Название</li>
              <li ref={slugRef}>Слаг</li>
              <li ref={iconRef}>Иконка</li>
              <li ref={updatedAtRef}>Дата обновления</li>
              <li ref={createdAtRef}>Дата регистрации</li>
              <li ref={servicesRef}>Услуги</li>
            </ul>
            <ul className={mainCl.content__menu}>
              {cardsData?.map(card => (
                <li key={card.id}>
                  <RepairCardModelRow
                    setCurrentCard={setCurrentCard}
                    viewCreateWindow={() =>
                      setCurrentWindow(CurrentWindowRCM.CREATE_MODEL)
                    }
                    card={card}
                    widths={widths}
                    checkList={checkList}
                    setCheckList={setCheckList}
                  />
                </li>
              ))}
            </ul>
          </div>
        </form>
      )}
    </>
  )
}

export default RepairCardModel
