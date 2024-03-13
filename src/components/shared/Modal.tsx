import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog'
// import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onChange: (open: boolean) => void
  title: string
  description: string
  children: React.ReactNode
}

const Modal = ({ isOpen, onChange, title, description, children }: ModalProps) => {
  return (
    <Dialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-neutral-900/90 backdrop-blur-sm" />
        <DialogContent className="fixed left-[50%] top-[50%] h-full max-h-full w-full translate-x-[-50%] translate-y-[-50%] rounded-md border border-neutral-700 bg-neutral-800 p-[25px] drop-shadow-md focus:outline-none md:h-auto md:max-h-[85vh] md:w-[90vw] md:max-w-[450px]">
          <DialogTitle className="mb-4 text-center text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription className="mb-5 text-center text-base leading-normal">
            {description}
          </DialogDescription>
          <div>{children}</div>
          {/* <DialogClose>
            <button
              className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-neutral-400 hover:text-white focus:outline-none"
              aria-label="Close"
            >
              <X />
            </button>
          </DialogClose> */}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default Modal
