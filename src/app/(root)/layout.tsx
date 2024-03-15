import Sidebar from '@/components/shared/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as HotToast } from 'react-hot-toast'
import ModalProvider from '@/providers/ModalProvider'
import SupabaseProvider from '@/providers/SupabaseProvider'
import { getSongsByUser } from '@/utils/actions/getSongsByUser'

export const revalidatePath = 20

export default async function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const songs = await getSongsByUser()
  return (
    <div className="m-0">
      <SupabaseProvider>
        <ModalProvider />
        <Sidebar songs={songs}>{children}</Sidebar>
        <Toaster />
        <HotToast />
      </SupabaseProvider>
    </div>
  )
}