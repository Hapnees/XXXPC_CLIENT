import React from 'react'
import { useActions } from '@hooks/useActions'
import { useAppSelector } from '@hooks/useAppSelector'
import { Tabs } from '@interfaces/tabs.interface'
import Search from '@components/UI/Search/Search'
import cl from './OpenModelForm.module.scss'

const OpenModelForm = () => {
  const { setCurrentTab, addTab } = useActions()
  const { tabs } = useAppSelector(state => state.tab)

  const onClickTab = (newTab: Tabs) => {
    if (tabs.some(tab => tab === newTab)) {
      setCurrentTab(newTab)
      return
    }

    addTab(newTab)
    setCurrentTab(newTab)
  }

  return (
    <div className={cl.wrapper}>
      <div className={cl.container}>
        <div className={cl.top__content}>
          <p className='text-[25px] font-semibold tracking-wide text-center'>
            Открыть модель
          </p>
          <Search placeholder='Поиск' />
        </div>

        <div className={cl.container__menu}>
          <p className='font-semibold tracking-wide px-3 mb-2'>Модели</p>
          <ul className={cl.menu}>
            <li onClick={() => onClickTab(Tabs.USER)}>
              <p>Пользователи</p>
              {/* <p>4</p> */}
            </li>
            <li onClick={() => onClickTab(Tabs.REPAIRCARD)}>
              Карточки ремонта
            </li>
            <li onClick={() => onClickTab(Tabs.SERVICE)}>Услуги</li>
            <li onClick={() => onClickTab(Tabs.ORDER)}>Заказы</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default OpenModelForm
