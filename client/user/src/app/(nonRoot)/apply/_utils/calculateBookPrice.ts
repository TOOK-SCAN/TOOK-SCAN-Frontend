import type { Books } from '@/types/book'
const PRICE_PER_PAGE = 10

interface CalculateTotalPriceProps {
  books: Books[]
}

export const hasNonDropBooks = (books: Books[]) => {
  return !books.every((book) => book.restoreOption === 'DISCARD')
}

export const calculateTotalPrice = ({ books }: CalculateTotalPriceProps) => {
  const shippingCost = hasNonDropBooks(books) ? 2500 : 0

  const totalBookCost = books.reduce((total, book) => {
    const pageCost = (book.pages || 0) * PRICE_PER_PAGE
    const restoreCost = book.restoreOption === 'SPRING' ? 4000 : 0

    return total + pageCost + restoreCost
  }, 0)

  return totalBookCost + shippingCost
}

export const calculatePrice = (book: Books) => {
  const pageCost = (book.pages || 0) * PRICE_PER_PAGE
  const restoreCost = book.restoreOption === 'RAW' ? 4000 : 0

  return pageCost + restoreCost
}
