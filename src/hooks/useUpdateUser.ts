import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useUpdateUserMutation } from '../api/user.api'
import { IUserUpdate } from '../interfaces/user/user-update.interface'
import { useActions } from './useActions'
import { useAppSelector } from './useAppSelector'
import { useHeaders } from './useHeaders'
import { useUploadAvatar } from './useUploadAvatar'

// Обновляем пользователя
export const useUpdateUser = (avatar: File | undefined) => {
  const headers = useHeaders()
  const { setAuth } = useActions()
  const {
    user: { id },
  } = useAppSelector(state => state.auth)
  const uploadAvatar = useUploadAvatar(avatar)
  const [updateUser] = useUpdateUserMutation()

  const temp = useCallback(
    (data: IUserUpdate) => {
      if (!id) {
        toast.error('Пользователь не найден')
        return
      }

      if (!data.phone) delete data.phone
      if (!data.password) delete data.password

      if (avatar) {
        uploadAvatar(data)
      } else {
        updateUser({ body: data, headers }).then(() => {
          setAuth({ user: { username: data.username } })
          toast.success('Профиль успешно обновлён')
        })
      }
    },
    [avatar]
  )

  return temp
}
