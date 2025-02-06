import type { Books, ShippingInfo, Terms } from '@/types/book'
import { initialShippingInfo, initialTerms } from '@/types/book'
import type { ReactNode } from 'react'
import { createContext, useContext, useRef, useState } from 'react'

interface ApplyContextType {
  pageIndex: number
  setPageIndex: React.Dispatch<React.SetStateAction<number>>
  books: Books[]
  setBooks: React.Dispatch<React.SetStateAction<Books[]>>
  shippingInfo: ShippingInfo
  setShippingInfo: React.Dispatch<React.SetStateAction<ShippingInfo>>
  updateShippingAddress: (addressData: Partial<ShippingInfo>) => void
  terms: Terms
  setTerms: (terms: Terms) => void
  ignoreBeforeUnload: React.MutableRefObject<boolean>
}

const ApplyContext = createContext<ApplyContextType | undefined>(undefined)

export const ApplyProvider = ({ children }: { children: ReactNode }) => {
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [books, setBooks] = useState<Books[]>([])
  const [shippingInfo, setShippingInfo] =
    useState<ShippingInfo>(initialShippingInfo)
  const [terms, setTerms] = useState<Terms>(initialTerms)
  const ignoreBeforeUnload = useRef<boolean>(false)

  const updateShippingAddress = (data: Partial<ShippingInfo>) => {
    setShippingInfo((prev) => ({ ...prev, ...data }))
  }

  return (
    <ApplyContext.Provider
      value={{
        pageIndex,
        setPageIndex,
        books,
        setBooks,
        shippingInfo,
        setShippingInfo,
        updateShippingAddress,
        terms,
        setTerms,
        ignoreBeforeUnload,
      }}
    >
      {children}
    </ApplyContext.Provider>
  )
}

export const useApplyContext = () => {
  const context = useContext(ApplyContext)
  if (!context) {
    throw new Error('useApplyContext must be used within an ApplyProvider')
  }
  return context
}
