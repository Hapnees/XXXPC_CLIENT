import { useAdminUploadImageMutation } from '@api/media.api'
import {
  useAdminCreateRepairCardMutation,
  useAdminUpdateRepairCardMutation,
} from '@api/repairCard.api'
import { useHeaders } from '@hooks/useHeaders'
import { IRepairCardCreate } from '@interfaces/adminInterfaces/repair-card'
import customToast from '@utils/customToast'
import { useCallback } from 'react'

export const useCreateCard = (icon: File | undefined) => {
  const headers = useHeaders()
  const [createCard] = useAdminCreateRepairCardMutation()
  const [updateCard] = useAdminUpdateRepairCardMutation()
  const [uploadIcon] = useAdminUploadImageMutation()

  const result = useCallback(
    (repairCard: IRepairCardCreate) => {
      if (!icon) {
        customToast.error('Отсутствует иконка')
        return
      }

      delete repairCard.menuDeletedIds
      delete repairCard.paragraphDeletedIds

      createCard({ body: repairCard, headers })
        .unwrap()
        .then(response => {
          customToast.success(response.message)
          const iconPath = new FormData()
          iconPath.append('image', icon, icon?.name)

          uploadIcon({
            data: { image: iconPath, folder: 'icon', id: response.cardId },
            headers,
          })
            .unwrap()
            .then(responseUpload =>
              updateCard({
                body: { id: response.cardId, iconPath: responseUpload.url },
                headers,
              })
            )
        })
    },
    [icon, createCard]
  )

  return result
}
