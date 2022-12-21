import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useUploadImageMutation, useUpdateProfileMutation } from '@api/index'
import { IUserUpdate } from '../interfaces/user/user-update.interface'
import { useActions, useAppSelector, useHeaders } from '@hooks/index'

// Загружаем аватарку, обновляем пользователя и сетаем значения в auth
export const useUploadAvatar = (avatar: File | undefined) => {
  const { setAuth } = useActions()
  const {
    user: { id },
  } = useAppSelector(state => state.auth)
  const headers = useHeaders()
  const [uploadAvatar] = useUploadImageMutation()
  const [updateUser] = useUpdateProfileMutation()

  const result = useCallback(
    (data: IUserUpdate) => {
      if (!avatar) return

      const avatarPath = new FormData()
      avatarPath.append('image', avatar, avatar.name)

      uploadAvatar({
        data: { image: avatarPath, id: id || 0, folder: 'avatar' },
        headers,
      }).then(response => {
        if (!('data' in response)) return

        data.avatarPath = response.data.url
        setAuth({
          user: { username: data.username, avatarPath: data.avatarPath },
        })

        updateUser({ body: data, headers }).then(() =>
          toast.success('Профиль успешно обновлён')
        )
      })
    },
    [avatar]
  )

  return result
}
