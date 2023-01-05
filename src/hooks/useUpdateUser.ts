import { useCallback } from 'react'
import { useUpdateProfileMutation } from '@api/user.api'
import { IUserUpdate } from '@interfaces/user/user-update.interface'
import {
  useActions,
  useAppSelector,
  useHeaders,
  useUploadAvatar,
} from '@hooks/index'
import customToast from '@utils/customToast'

// Обновляем пользователя
export const useUpdateUser = (avatar: File | undefined) => {
  const headers = useHeaders()
  const { setAuth } = useActions()
  const {
    user: { id },
  } = useAppSelector(state => state.auth)
  const uploadAvatar = useUploadAvatar(avatar)
  const [updateUser] = useUpdateProfileMutation()

  const temp = useCallback(
    (data: IUserUpdate) => {
      if (!id) {
        customToast.error('Пользователь не найден')
        return
      }

      if (!data.phone) delete data.phone
      if (!data.password) delete data.password

      if (avatar) {
        uploadAvatar(data)
      } else {
        updateUser({ body: data, headers })
          .unwrap()
          .then(response => {
            setAuth({ user: { username: data.username } })
            customToast.success(response.message)
          })
      }
    },
    [avatar]
  )

  return temp
}

//#321535
