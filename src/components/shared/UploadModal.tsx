import { useUploadModal } from '@/hooks/useUploadModal'
import Modal from './Modal'
import { UploadForm } from './UploadForm'

function UploadModal() {
  const uploadModal = useUploadModal()

  const onChange = () => {
    uploadModal.onClose()
  }

  return (
    <Modal
      isOpen={uploadModal.isOpen}
      onChange={onChange}
      title="Add a song"
      description="Upload a MP3 file"
    >
      <UploadForm />
    </Modal>
  )
}

export default UploadModal
