'use client'

import { useQuery } from '@tanstack/react-query'
import { getUserSummaries } from '@/api/getUserSummaries'

export const useUserSummaries = () => {
  return useQuery({
    queryKey: ['userSummaries'],
    queryFn: getUserSummaries,
    enabled: false, // 기본적으로 비활성화, 버튼 클릭 시 실행
  })
}
