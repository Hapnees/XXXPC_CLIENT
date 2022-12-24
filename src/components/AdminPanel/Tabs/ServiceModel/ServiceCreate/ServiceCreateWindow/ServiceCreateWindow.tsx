import Search from '@components/UI/Search/Search'
import React, { FC, useEffect, useState } from 'react'
import cl from './ServiceCreateWindow.module.scss'
import { IoClose } from 'react-icons/io5'
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
} from '@api/service.api'
import { IServiceCreate } from '@interfaces/adminInterfaces/service-create.interface'
import { useHeaders } from '@hooks/useHeaders'
import { toast } from 'react-toastify'
import { ServiceGetResponse } from '@interfaces/adminInterfaces'
import { IServiceUpdate } from '@interfaces/adminInterfaces/service.update.interface'
import {
  RepairCardSlug,
  RepairCardSlugView,
} from '@interfaces/adminInterfaces/repair-card-slug.enum'
import { useGetUsedRepairCardSlugsQuery } from '@api/repairCard.api'

enum Radio {
  ONE = 'ONE',
  TWO = 'TWO',
}

const selectData = [
  { value: RepairCardSlug.PC, label: RepairCardSlugView.PC },
  { value: RepairCardSlug.LAPTOP, label: RepairCardSlugView.LAPTOP },
  { value: RepairCardSlug.PHONE, label: RepairCardSlugView.PHONE },
]

interface IProps {
  toClose: () => void
  repairCardId?: number
  currentService?: ServiceGetResponse
  setCurrentService: React.Dispatch<
    React.SetStateAction<ServiceGetResponse | undefined>
  >
}

const ServiceCreateWindow: FC<IProps> = ({
  toClose,
  repairCardId,
  currentService,
  setCurrentService,
}) => {
  const isEdit = !!currentService
  const topTitle = isEdit ? 'Изменение услуги' : 'Создание услуги'
  const buttonTitle = isEdit ? 'Обновить' : 'Создать'
  const headers = useHeaders()

  const { data: usedSlugsData } = useGetUsedRepairCardSlugsQuery(headers, {
    skip: !!repairCardId,
  })

  const [currentSlug, setCurrentSlug] = useState<RepairCardSlug>()

  const [updateService] = useUpdateServiceMutation()
  const [createService] = useCreateServiceMutation()
  const [radioVal, setRadioVal] = useState(
    currentService
      ? currentService.prices.length === 1
        ? Radio.ONE
        : currentService.prices.length === 2 && Radio.TWO
      : Radio.ONE
  )

  const [title, setTitle] = useState(currentService?.title || '')

  const [specificPrice, setSpecificPrice] = useState(
    currentService && currentService.prices.length === 1
      ? currentService.prices[0]
      : ''
  )
  const [range, setRange] = useState<{ min: string; max: string }>(
    currentService && currentService.prices.length === 2
      ? { min: currentService.prices[0], max: currentService.prices[1] }
      : {
          min: '',
          max: '',
        }
  )

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (isEdit) {
      const data: IServiceUpdate = {
        id: currentService.id,
        title,
        prices: specificPrice ? [specificPrice] : [range.min, range.max],
      }
      updateService({ body: data, headers })
        .unwrap()
        .then(response => {
          toast.success(response.message)
          setCurrentService(undefined)
          toClose()
        })

      return
    }

    if (!repairCardId && !usedSlugsData) {
      toast.error('Карточка не найдена')
      return
    }

    const data: IServiceCreate = {
      title,
      prices: specificPrice
        ? [specificPrice]
        : range && range.min && range.max
        ? [range.min, range.max]
        : [],
      repairCardId,
      repairCardSlug: currentSlug,
    }
    createService({ body: data, headers })
      .unwrap()
      .then(response => {
        toast.success(response.message)
        toClose()
      })
  }

  const onClickClose = () => {
    setCurrentService(undefined)
    toClose()
  }

  useEffect(() => {
    usedSlugsData &&
      usedSlugsData.slugs.length &&
      setCurrentSlug(usedSlugsData.slugs[0] as RepairCardSlug)
  }, [usedSlugsData])

  return (
    <div className={cl.wrapper}>
      <IoClose
        className='absolute right-2 top-2 p-1 cursor-pointer'
        size={30}
        onClick={onClickClose}
      />
      <p className='text-center mb-2 text-[20px]'>{topTitle}</p>

      <form className='flex flex-col gap-4' onSubmit={event => onSubmit(event)}>
        {!repairCardId && (
          <select
            className='bg-prisma-blue py-1 px-2 cursor-pointer'
            value={currentSlug}
            onChange={event =>
              setCurrentSlug(event.target.value as RepairCardSlug)
            }
          >
            {selectData
              ?.filter(el => usedSlugsData?.slugs.includes(el.value))
              .map((el, idx) => (
                <option value={el.value} label={el.label} key={idx}></option>
              ))}
          </select>
        )}
        <Search
          placeholder='Название услуги'
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value)
          }}
          autoFocus
        />

        <div className='flex justify-center'>
          <input
            type='radio'
            id={Radio.ONE}
            name='price'
            className={cl.radio}
            checked={radioVal === Radio.ONE}
            onChange={() => {
              setRadioVal(Radio.ONE)
              setRange({ min: '', max: '' })
            }}
          />
          <label htmlFor={Radio.ONE} className={cl.label}>
            Конкретная цена
          </label>
          <input
            type='radio'
            id={Radio.TWO}
            name='price'
            className={cl.radio}
            checked={radioVal === Radio.TWO}
            onChange={() => {
              setRadioVal(Radio.TWO)
              setSpecificPrice('')
            }}
          />
          <label htmlFor={Radio.TWO} className={cl.label}>
            Диапазон цен
          </label>
        </div>

        <div className='flex flex-col items-center'>
          {radioVal === Radio.ONE ? (
            <Search
              className={cl.price}
              placeholder='Цена'
              value={specificPrice}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSpecificPrice(event.target.value)
              }
            />
          ) : (
            radioVal === Radio.TWO && (
              <div className='flex gap-4'>
                <Search
                  className={cl.price}
                  placeholder='От'
                  value={range.min}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setRange(prev => ({
                      ...prev,
                      min: event.target.value,
                    }))
                  }
                />
                <Search
                  className={cl.price}
                  placeholder='До'
                  value={range.max}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setRange(prev => ({
                      ...prev,
                      max: event.target.value,
                    }))
                  }
                />
              </div>
            )
          )}
        </div>

        <button className={cl.button}>{buttonTitle}</button>
      </form>
    </div>
  )
}

export default ServiceCreateWindow
