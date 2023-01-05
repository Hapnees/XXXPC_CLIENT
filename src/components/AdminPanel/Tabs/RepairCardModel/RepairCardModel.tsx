import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  useAdminDeleteRepairCardMutation,
  useLazyAdminGetRepairCardsQuery,
} from '@api/repairCard.api'
import { useHeaders } from '@hooks/useHeaders'
import { AdminLoader } from '@components/UI/AdminUi/index'
import mainCl from '../tabs.module.scss'
import RepairCardModelRow from './RepairCardModelRow/RepairCardModelRow'
import RepairCardCreate from './RepairCardCreate/RepairCardCreate'
import { RepairCardsGetResponse } from '@interfaces/adminInterfaces/repair-card'
import ServiceCreate from '../ServiceModel/ServiceCreate/ServiceCreate'
import { CreateButton, DeleteButton } from '@components/UI/AdminUi/Buttons'
import {
  RepairCardSlug,
  RepairCardSlugView,
} from '@interfaces/adminInterfaces/repair-card/repair-card-slug.enum'
import SpecialInput from '@components/UI/AdminUi/AdminSpecialInput/SpecialInput'
import { HiSearch } from 'react-icons/hi'
import { repairCardMenuTitles } from '../tabs.titles'
import customToast from '@utils/customToast'
import { IFieldMenuElement } from '@interfaces/adminInterfaces/fieldMenuElement.interface'
import AdminFieldsPopup from '@components/AdminPanel/AdminFieldsPopup/AdminFieldsPopup'
import Pagination from '@components/AdminPanel/Pagination/Pagination'

export enum CurrentWindowRCM {
  LIST = 'LIST',
  CREATE_MODEL = 'CREATE_MODEL',
  CREATE_SERVICE = 'CREATE_SERVICE',
}

const selectData = [
  { value: RepairCardSlug.PC, label: RepairCardSlugView.PC },
  { value: RepairCardSlug.LAPTOP, label: RepairCardSlugView.LAPTOP },
  { value: RepairCardSlug.PHONE, label: RepairCardSlugView.PHONE },
]

const RepairCardModel = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const searchRef = useRef<HTMLInputElement>(null)
  const [checkList, setCheckList] = useState<number[]>([])

  const headers = useHeaders()
  const [deleteCard] = useAdminDeleteRepairCardMutation()

  const [getRepairCards, { data: cardsData, isLoading }] =
    useLazyAdminGetRepairCardsQuery()

  const getRepairCardsWithParams = useCallback(
    () =>
      getRepairCards({
        headers,
        search: searchRef.current?.value,
        page: currentPage,
      }),
    [getRepairCards]
  )

  const slugs = cardsData?.data.map(el => el.slug)

  const [currentCard, setCurrentCard] = useState<RepairCardsGetResponse>()
  const [currentWindow, setCurrentWindow] = useState<CurrentWindowRCM>(
    CurrentWindowRCM.LIST
  )

  const currentSlugs = selectData?.filter(
    el => !slugs?.includes(el.value) || el.value === currentCard?.slug
  )

  const [checkFields, setCheckFields] = useState<IFieldMenuElement[]>(
    repairCardMenuTitles
      .map(el => ({ title: el, checked: true }))
      .map(el => ({
        ...el,
        checked:
          el.title === 'Дата регистрации' || el.title === 'Дата обновления'
            ? false
            : true,
      }))
  )

  const onClickCreate = () => {
    if (!currentSlugs || !currentSlugs.length) {
      customToast.error('Все категории заняты!')
      return
    }

    setCurrentWindow(CurrentWindowRCM.CREATE_MODEL)
    setCurrentCard(undefined)
  }

  const onClickDelete = () => {
    deleteCard({ body: checkList, headers })
      .unwrap()
      .then(response => customToast.success(response.message))
  }

  // Получаем данные о карточках
  useEffect(() => {
    getRepairCardsWithParams()
  }, [])

  const onKeyDownEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      getRepairCardsWithParams()
    }
  }

  return (
    <>
      {currentWindow === CurrentWindowRCM.CREATE_MODEL ? (
        <RepairCardCreate
          id={currentCard?.id || 0}
          setCurrentWindow={setCurrentWindow}
          repairCardModelRefetch={getRepairCardsWithParams}
          slugs={currentSlugs || []}
        />
      ) : currentWindow === CurrentWindowRCM.CREATE_SERVICE ? (
        <ServiceCreate
          title={currentCard?.title || ''}
          repairCardId={currentCard?.id || 0}
          toBack={() => setCurrentWindow(CurrentWindowRCM.CREATE_MODEL)}
        />
      ) : isLoading ? (
        <AdminLoader />
      ) : (
        <div className='flex flex-col items-center'>
          <div>
            <div className='flex items-center gap-2 mb-2 ml-2'>
              <div className='flex gap-2'>
                <p className='text-[20px]'>Карточки ремонта</p>
                <CreateButton onClickCreate={onClickCreate} />
                <DeleteButton onClickDelete={onClickDelete} />
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-[400px]'>
                  <SpecialInput
                    placeholder='Поиск карточки'
                    ref={searchRef}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (searchRef.current?.value)
                        searchRef.current.value = event.target.value
                    }}
                    onKeyDown={event => onKeyDownEnter(event)}
                  />
                </div>
                <HiSearch
                  className='bg-[#434e62] w-[70px] h-[35px] p-1 rounded-md cursor-pointer'
                  onClick={getRepairCardsWithParams}
                />
              </div>
              {/* <AdminFieldsPopup
                checkFields={checkFields}
                setCheckFields={setCheckFields}
              /> */}
            </div>
            <div className={mainCl.container__menu}>
              <ul className={mainCl.top__menu}>
                {checkFields
                  .filter(el => el.checked)
                  .map((el, idx) => (
                    <li key={idx}>{el.title}</li>
                  ))}
              </ul>
              <ul className={mainCl.content__menu}>
                {cardsData?.data.map(card => (
                  <li key={card.id}>
                    <RepairCardModelRow
                      checkFieldsList={checkFields}
                      setCurrentCard={setCurrentCard}
                      viewCreateWindow={() =>
                        setCurrentWindow(CurrentWindowRCM.CREATE_MODEL)
                      }
                      card={card}
                      checkList={checkList}
                      setCheckList={setCheckList}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalCount={cardsData?.totalCount || 0}
          />
        </div>
      )}
    </>
  )
}

export default RepairCardModel
