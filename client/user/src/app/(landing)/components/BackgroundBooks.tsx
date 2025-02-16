import Image from 'next/image'
import bookTrans from './image/bookTrans.svg'

const BackgroundBooks = () => {
  return (
    // -z-10으로 하위 레이어에 배치
    // overflow-hidden으로 배경 영역 밖 이미지 잘림 방지(필요 시 조정)
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Book #1 */}
      <div className="absolute left-0 top-0 h-32 w-32 rotate-12 opacity-100">
        <Image
          src={bookTrans}
          alt="Transparent Book 1"
          fill
          className="object-contain"
        />
      </div>

      {/* Book #2 */}
      <div className="absolute right-0 top-10 h-40 w-40 rotate-[30deg] transform">
        <Image
          src={bookTrans}
          alt="Transparent Book 2"
          fill
          className="object-contain"
        />
      </div>

      {/* Book #3 */}
      <div className="absolute bottom-20 left-1/4 h-28 w-28 rotate-[345deg] transform">
        <Image
          src={bookTrans}
          alt="Transparent Book 3"
          fill
          className="object-contain"
        />
      </div>

      {/* Book #4 */}
      <div className="absolute bottom-10 right-1/4 h-24 w-24 rotate-[15deg] transform">
        <Image
          src={bookTrans}
          alt="Transparent Book 4"
          fill
          className="object-contain"
        />
      </div>

      {/* Book #5 */}
      <div className="absolute left-10 top-1/2 h-32 w-32 rotate-[350deg] transform opacity-20">
        <Image
          src={bookTrans}
          alt="Transparent Book 5"
          fill
          className="object-contain"
        />
      </div>

      {/* Book #6 */}
      <div className="absolute right-0 top-1/2 h-48 w-48 rotate-[25deg] transform">
        <Image
          src={bookTrans}
          alt="Transparent Book 6"
          fill
          className="object-contain"
        />
      </div>
    </div>
  )
}

export default BackgroundBooks
