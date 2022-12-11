import React from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import { useHeaders } from '../../hooks/useHeaders'
import { useRegister } from '../../hooks/useRegister'

const ConfirmPage = () => {
  const params = useParams()
  const token = params.token
  const headers = useHeaders(token)
  const { isLoading } = useRegister(headers)

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <p className='text-center text-[40px] text-[#ffc8f7] mt-4'>
          Аккаунт подтверждён!
        </p>
      )}
    </div>
  )
}

export default ConfirmPage
