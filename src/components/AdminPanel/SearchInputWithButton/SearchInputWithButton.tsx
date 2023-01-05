import SpecialInput from '@components/UI/AdminUi/AdminSpecialInput/SpecialInput'
import React, { FC } from 'react'
import { HiSearch } from 'react-icons/hi'

interface IProps {
  searchRef: React.RefObject<HTMLInputElement>
  onKeyDownEnter: (event: React.KeyboardEvent) => void
  getDataWithParams: () => void
}

const SearchInputWithButton: FC<IProps> = ({
  searchRef,
  onKeyDownEnter,
  getDataWithParams,
}) => {
  return (
    <div className='flex items-center gap-2'>
      <div className='w-[400px]'>
        <SpecialInput
          placeholder='Поиск услуги'
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
        onClick={getDataWithParams}
      />
    </div>
  )
}

export default SearchInputWithButton
