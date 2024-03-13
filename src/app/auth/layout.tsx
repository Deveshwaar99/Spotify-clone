export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-black py-12">
      <div className="relative mx-auto w-full max-w-lg rounded-2xl bg-almostBlack px-6 pb-9 pt-10 shadow-xl">
        {children}
      </div>
    </div>
  )
}
