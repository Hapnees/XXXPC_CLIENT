import { useAdminUploadImageMutation } from '@api/media.api'
import { useAdminUpdateRepairCardMutation } from '@api/repairCard.api'
import { useHeaders } from '@hooks/useHeaders'
import { RepairCardsGetResponse } from '@interfaces/adminInterfaces'
import { IRepairCardCreate } from '@interfaces/adminInterfaces/repair-card-create.interface'
import { toast } from 'react-toastify'

export const useUpdateCard = (
  repairCard: IRepairCardCreate,
  cardData: RepairCardsGetResponse | undefined,
  icon: File | undefined,
  refetch: () => void,
  repairCardModelRefetch: () => void
) => {
  const headers = useHeaders()
  const [updateCard] = useAdminUpdateRepairCardMutation()
  const [uploadIcon] = useAdminUploadImageMutation()

  if (!cardData) return
  updateCard({ body: { ...repairCard, id: cardData.id }, headers })
    .unwrap()
    .then(response => {
      toast.success(response.message)
      repairCardModelRefetch()
      refetch()

      if (icon) {
        const iconPath = new FormData()
        iconPath.append('image', icon, icon?.name)

        uploadIcon({
          data: { image: iconPath, folder: 'icon', id: cardData.id },
          headers,
        })
          .unwrap()
          .then(() => {
            refetch()
            repairCardModelRefetch()
          })
      }
    })
}
