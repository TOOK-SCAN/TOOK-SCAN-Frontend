'use client'

import { useQuery } from '@tanstack/react-query'
import { httpInstance } from '@tookscan/config'

const fetchTest = async (testId: number) => {
  const data = await httpInstance.get(`test/${testId}`)
  return data
}

const Test = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['test'],
    queryFn: () => fetchTest(1),
  })

  if (isLoading) return <div>로딩 중 입니당...</div>

  if (isError) return <div>에러 발생했어요...</div>

  return <div>{data?.json()}</div>
}

export default Test
