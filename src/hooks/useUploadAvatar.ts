import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useUploadImageMutation } from '../api/media.api'
import { useUpdateUserMutation } from '../api/user.api'
import { IUserUpdate } from '../interfaces/user/user-update.interface'
import { useActions } from './useActions'
import { useAppSelector } from './useAppSelector'
import { useHeaders } from './useHeaders'

// Загружаем аватарку, обновляем пользователя и сетаем значения в auth
export const useUploadAvatar = (avatar: File | undefined) => {
  const { setAuth } = useActions()
  const {
    user: { id },
  } = useAppSelector(state => state.auth)
  const headers = useHeaders()
  const [uploadAvatar] = useUploadImageMutation()
  const [updateUser] = useUpdateUserMutation()

  const result = useCallback(
    (data: IUserUpdate) => {
      if (!avatar) return

      const avatarPath = new FormData()
      avatarPath.append('image', avatar, avatar.name)

      uploadAvatar({
        data: { image: avatarPath, userId: id || 0, folder: 'avatar' },
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
