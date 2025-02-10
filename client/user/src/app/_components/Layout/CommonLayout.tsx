import { Footer, Header } from '@/components'

export const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 overflow-hidden">{children}</main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}
