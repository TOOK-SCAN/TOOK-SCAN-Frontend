'use client'

import { Button } from '..'

import { CheckButton } from './CheckButton'

interface DeliveryTrackingProps {
  trackingNumber: string
}

export const DeliveryTracking = ({ trackingNumber }: DeliveryTrackingProps) => {
  const statuses = [
    '결제완료',
    '상품준비중',
    '배송준비중',
    '배송중',
    '배송완료',
  ]
  const currentStatus = '배송중' // 초기 상태를 '배송중'으로 설정

  return (
    <div>
      <div className="mt-4 border-b pb-4 text-gray-500">
        <div className="caption1 flex justify-between">
          <span>송장번호</span>
          <span className="caption1">{trackingNumber}</span>
        </div>
        <div className="caption1 mt-2 flex justify-between text-gray-500">
          <span>택배사</span>
          <span className="caption1">한진택배</span>
        </div>
      </div>

      {/* 현재 상태 */}
      <div className="mt-4 flex items-center justify-between">
        <span className="btn1">현재상태</span>
        <span className="caption1 ml-2 text-gray-500">
          12월 27일 (금) 도착예정
        </span>
      </div>

      {/* 진행 상태 표시 */} {/* Todo 동그라미 사이에 아이콘*/}
      <div className="mt-4 flex items-center justify-between">
        {statuses.map((status, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full ${
                status === currentStatus ? 'bg-blue-500' : 'bg-gray-100'
              }`}
            />
            <span className="mt-1 text-xs text-gray-600">{status}</span>
          </div>
        ))}
      </div>

      {/* 배송 과정 타임라인 */}
      <div className="mt-6 space-y-4 border-t pt-4">
        {[
          {
            status: '배송완료',
            location: '서울실버종합물류 (성북B)',
            date: '2024-12-23 13:12:13',
          },
          {
            status: '배송출발',
            location: '서울실버종합물류 (성북B)',
            date: '2024-12-23 10:05:45',
          },
          {
            status: '배송중',
            location: '서울실버종합물류 (성북B)',
            date: '2024-12-22 18:32:21',
          },
        ].map((item, index) => {
          const isActive = item.status === currentStatus

          return (
            <div key={index} className="relative flex items-start space-x-4">
              {/* 체크 버튼과 점선 그룹 */}
              <div className="relative flex flex-col items-center">
                {/* 점선 (첫 번째 요소 제외) */}
                {index !== 0 && (
                  <div className="absolute top-[-50px] z-0 h-[4.5rem] w-[1px] border-l-2 border-dashed" />
                )}

                {/* 체크 버튼 (현재 상태일 때 체크됨) */}
                <CheckButton
                  isChecked={isActive}
                  onClick={() => {}}
                  size="sm"
                />
              </div>

              {/* 상태 정보 */}
              <div>
                <p
                  className={`btn2 ${isActive ? 'text-blue-500' : 'text-gray-700'}`}
                >
                  {item.status}
                </p>
                <p className="caption2 font-bold text-gray-500">
                  {item.location}
                </p>
                <p className="caption2 text-gray-400">{item.date}</p>
              </div>
            </div>
          )
        })}
      </div>
      {/* 닫기 버튼 */}
      <div className="mt-6">
        <Button className="flex-1" variant="primary" size="sm">
          닫기
        </Button>
        {/* Todo 모달 닫기 아직 구현 못함*/}
      </div>
    </div>
  )
}

export default DeliveryTracking
