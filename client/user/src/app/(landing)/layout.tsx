'use client'
import type { LayoutProps } from '@/types/common'
import { Button } from '@tookscan/components'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Took from './_assets/image/eyes.svg'
import Background from './_assets/image/mainbg.svg'

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter()
  return (
    <div>
      <div className="relative z-0 h-screen w-full">
        {/* 배경 이미지 */}
        <Image
          src={Background}
          alt="배경"
          layout="fill" // 이미지가 부모 div를 가득 채움
          objectFit="cover" // 화면 크기에 맞게 조정
          objectPosition="center" // 중앙 정렬
          priority // 성능 최적화를 위해 우선 로드
        />
        <div className="flex h-full w-full items-center justify-center">
          <div className="juistify-center flex max-w-[30rem] flex-col items-center gap-[3.12rem]">
            {/* 로고 */}
            <Image
              src={Took}
              alt="툭스캔"
              width={240}
              height={150}
              className="transform"
            />
            <div className="z-10 flex w-full flex-col items-center justify-center">
              <div className="font-bold text-white title1">기벼운 대학생활</div>
              <div className="font-bold text-white title1">
                툭스캔으로 시작하자!
              </div>
            </div>
            <Button
              className="z-10 flex-1"
              variant="primary"
              size="md"
              onClick={() => router.push('/apply')}
            >
              신청하러가기
            </Button>
          </div>
        </div>
      </div>

      {/* 🔹 네비게이션 바 */}
      <nav className="flex h-[7rem] items-center justify-center space-x-[1.5rem] bg-black text-white title2">
        <Link
          href="/"
          className="relative px-4 py-2 text-white transition-colors duration-300 after:absolute after:bottom-[-1.75rem] after:left-0 after:h-[4px] after:w-full after:bg-transparent hover:text-blue-primary hover:after:bg-blue-primary"
        >
          툭스캔은?
        </Link>

        <Link
          href="/howToUse"
          className="relative px-4 py-2 text-white transition-colors duration-300 after:absolute after:bottom-[-1.75rem] after:left-0 after:h-[4px] after:w-full after:bg-transparent hover:text-blue-primary hover:after:bg-blue-primary"
        >
          이용방법
        </Link>
        <Link
          href="/pricing"
          className="relative px-4 py-2 text-white transition-colors duration-300 after:absolute after:bottom-[-1.75rem] after:left-0 after:h-[4px] after:w-full after:bg-transparent hover:text-blue-primary hover:after:bg-blue-primary"
        >
          가격안내
        </Link>
      </nav>

      {/* 🔹 페이지별 콘텐츠 */}
      <main>{children}</main>
    </div>
  )
}
export default Layout

// 화면 넘어가는 애니메이션 추가한 버전
// pnpm add framer-motion -w 명령어로 설치해서 사용할 수 있음
// 근데 설치해도 되는지 모르겠어서 일단 코드만 남겨둠..
// 'use client'

// import type { LayoutProps } from '@/types/common'
// import { Button } from '@tookscan/components'
// import { AnimatePresence, motion } from 'framer-motion'
// import Image from 'next/image'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import Took from './components/image/eyes.svg'
// import Background from './components/image/mainbg.svg'

// const Layout = ({ children }: LayoutProps) => {
//   const currentPage = usePathname()

//   return (
//     <div>
//       <div className="relative z-0 h-screen w-full">
//         {/* 배경 이미지 */}
//         <Image
//           src={Background}
//           alt="배경"
//           fill
//           className="object-cover object-center"
//           priority
//         />
//         <div className="flex h-full w-full items-center justify-center">
//           <div className="flex max-w-[30rem] flex-col items-center gap-[3.12rem]">
//             {/* 로고 */}
//             <Image src={Took} alt="툭스캔" width={240} height={150} />
//             <div className="z-10 flex w-full flex-col items-center justify-center">
//               <div className="font-bold text-white title1">가벼운 대학생활</div>
//               <div className="font-bold text-white title1">
//                 툭스캔으로 시작하자!
//               </div>
//             </div>
//             <Button className="z-10 flex-1" variant="primary" size="md">
//               신청하러가기
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* 🔹 네비게이션 바 */}
//       <nav className="flex h-[7rem] items-center justify-center space-x-[1.5rem] bg-black text-white title2">
//         <Link href="/" className={`nav-item ${currentPage === '/' ? 'active' : ''}`}>
//           툭스캔은?
//         </Link>
//         <Link href="/howToUse" className={`nav-item ${currentPage === '/howToUse' ? 'active' : ''}`}>
//           이용방법
//         </Link>
//         <Link href="/pricing" className={`nav-item ${currentPage === '/pricing' ? 'active' : ''}`}>
//           가격안내
//         </Link>
//       </nav>

//       {/* 🔹 페이지별 콘텐츠 (애니메이션 적용) */}
//       <AnimatePresence mode="wait">
//         <motion.main
//           key={currentPage}
//           initial={{ opacity: 0, x: 100 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -100 }}
//           transition={{ duration: 0.5 }}
//         >
//           {children}
//         </motion.main>
//       </AnimatePresence>

//       {/* 스타일 추가 */}
//       <style jsx global>{`
//         .nav-item {
//           position: relative;
//           padding: 10px 20px;
//           transition: color 0.3s ease-in-out;
//         }
//         .nav-item.active {
//           color: #3b82f6;
//         }
//         .nav-item::after {
//           content: '';
//           position: absolute;
//           bottom: -8px;
//           left: 0;
//           width: 100%;
//           height: 4px;
//           background: transparent;
//           transition: background 0.3s ease-in-out;
//         }
//         .nav-item.active::after {
//           background: #3b82f6;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default Layout
