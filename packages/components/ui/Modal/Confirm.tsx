interface ConfirmType {
  title: string
  children?: React.ReactNode
}

export const Confirm = ({ title, children }: ConfirmType) => {
  return (
    <div
      role="dialog"
      aria-labelledby="modal-title"
      aria-model="true"
      className="flex w-full flex-col items-center"
    >
      <h3 id="modal-title" className="h3 px-5 py-6">
        {title}
      </h3>
      <hr className="-px-8 h-[1px] w-full bg-gray-300" />
      <div className="mt-8 flex w-full flex-col items-center gap-12">
        {children}
      </div>
    </div>
  )
}
