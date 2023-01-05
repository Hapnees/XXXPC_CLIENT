import { useAdminUploadImageMutation } from '@api/media.api'
import { useAdminUpdateRepairCardMutation } from '@api/repairCard.api'
import { useHeaders } from '@hooks/useHeaders'
import {
  RepairCardsGetResponse,
  IRepairCardCreate,
} from '@interfaces/adminInterfaces/repair-card'
import customToast from '@utils/customToast'
import { useCallback } from 'react'

export const useUpdateCard = (
  cardData: RepairCardsGetResponse | undefined,
  icon: File | undefined,
  refetch: () => void,
  repairCardModelRefetch: () => void
) => {
  const headers = useHeaders()
  const [updateCard] = useAdminUpdateRepairCardMutation()
  const [uploadIcon] = useAdminUploadImageMutation()

  const result = useCallback(
    (repairCard: IRepairCardCreate) => {
      if (!cardData) return

      updateCard({ body: { ...repairCard, id: cardData.id }, headers })
        .unwrap()
        .then(response => {
          customToast.success(response.message)

          if (icon) {
            const iconPath = new FormData()
            iconPath.append('image', icon, icon?.name)

            uploadIcon({
              data: { image: iconPath, folder: 'icon', id: cardData.id },
              headers,
            }).then(() => {
              refetch()
              repairCardModelRefetch()
            })
          }
        })
    },
    [cardData, icon, refetch, repairCardModelRefetch]
  )

  return result
}
