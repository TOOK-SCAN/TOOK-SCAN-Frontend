import {
  CommonSpriteSheet,
  ModalSheet,
  QueryProvider,
  SpriteSheet,
  ToastSheet,
} from '@tookscan/components'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      {SpriteSheet}
      {CommonSpriteSheet}
      <ModalSheet />
      <ToastSheet />

      {children}
    </QueryProvider>
  )
}
