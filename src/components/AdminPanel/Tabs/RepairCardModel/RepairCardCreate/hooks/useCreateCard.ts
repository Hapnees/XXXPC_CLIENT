import { useAdminUploadImageMutation } from '@api/media.api'
import { useAdminCreateRepairCardMutation } from '@api/repairCard.api'
import { useHeaders } from '@hooks/useHeaders'
import { IRepairCardCreate } from '@interfaces/adminInterfaces/repair-card-create.interface'
import { useCallback } from 'react'
import { toast } from 'react-toastify'

export const useCreateCard = (
  icon: File | undefined,
  refetch: () => void,
  repairCardModelRefetch: () => void
) => {
  const headers = useHeaders()
  const [createCard] = useAdminCreateRepairCardMutation()
  const [uploadIcon] = useAdminUploadImageMutation()

  const result = useCallback(
    (repairCard: IRepairCardCreate) => {
      if (!icon) {
        toast.error('Отсутствует иконка')
        return
      }

      createCard({ body: repairCard, headers })
        .unwrap()
        .then(response => {
          toast.success(response.message)
          repairCardModelRefetch()
          refetch()
          const iconPath = new FormData()
          iconPath.append('image', icon, icon?.name)

          uploadIcon({
            data: { image: iconPath, folder: 'icon', id: response.cardId },
            headers,
          })
            .unwrap()
            .then(() => {
              refetch()
              repairCardModelRefetch()
            })
        })
    },
    [icon, createCard, repairCardModelRefetch]
  )

  return result
}
