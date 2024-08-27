import Player from '@/components/shared/Player'
import Sidebar from '@/components/shared/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import ModalProvider from '@/providers/ModalProvider'
import { QueryProvider } from '@/providers/QueryProvider'
import SupabaseProvider from '@/providers/SupabaseProvider'
import { getSongsByUser } from '@/utils/actions/getSongsByUser'
import { Toaster as HotToast } from 'react-hot-toast'

export const revalidatePath = 120

export default async function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const songs = await getSongsByUser()

  return (
    <div className="m-0 h-full antialiased">
      <SupabaseProvider>
        <QueryProvider>
          <ModalProvider />
          <Sidebar songs={songs}>{children}</Sidebar>
          <Player />
        </QueryProvider>
        <Toaster />
        <HotToast />
      </SupabaseProvider>
    </div>
  )
}
