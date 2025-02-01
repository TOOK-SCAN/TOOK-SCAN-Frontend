'use client'

import React, { useEffect, useState, ChangeEvent, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import searchAddress from '@/api/kakao'
import { debounce } from 'lodash'
import clsx from 'clsx'
import { Icon } from '../Icon/Icon'

interface SearchAddressProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  closeModal: () => void
}

export const SearchAddress = ({ onChange, closeModal }: SearchAddressProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const [keyword, setKeyword] = useState<string>('')
  const [center, setCenter] = useState({ lat: 0, lng: 0 })

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['search address', keyword],
    queryFn: ({ pageParam = 1 }) =>
      searchAddress(keyword, center.lat, center.lng, pageParam, 10),
    enabled: !!keyword,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.meta?.is_end) {
        return undefined
      }
      return allPages.length + 1
    },
    initialPageParam: 1,
  })

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error(`Error Code = ${error.code} - ${error.message}`)
        }
      )
    } else {
      console.error('이 브라우저에서는 Geolocation이 지원되지 않습니다.')
    }
  }, [])

  useEffect(() => {
    if (!loadMoreRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    )

    observer.observe(loadMoreRef.current)

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [fetchNextPage, hasNextPage])

  const debouncedSetKeyword = debounce(
    (value: string) => setKeyword(value),
    500
  )

  return (
    <div className="flex h-96 w-full flex-col">
      <div className="border-blue-secondary flex h-14 w-full flex-row items-center justify-start rounded-lg border-2">
        <Icon
          id="search"
          width={20}
          height={20}
          className="text-blue-primary ml-2"
        />
        <input
          ref={inputRef}
          type="text"
          className="mx-2 h-full w-full focus:outline-none"
          placeholder="주소를 입력하세요"
          onChange={(e) => debouncedSetKeyword(e.target.value)}
        />
      </div>
      <div
        className={clsx(
          'bg-blue-secondary text-blue-primary border-blue-secondary mt-2 flex w-full flex-row items-center justify-start rounded-t-lg border-2 px-4 py-1 font-semibold'
        )}
      >
        검색 결과
      </div>
      <div className="hide-scrollbar border-blue-secondary relative flex h-full w-full flex-col overflow-y-scroll rounded-b-lg border-2">
        {data?.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page?.documents.map((doc, docIndex) => (
              <button
                className="w-full"
                key={docIndex}
                onClick={() => {
                  const addressValue = doc.road_address_name
                    ? doc.road_address_name
                    : doc.address_name

                  onChange({
                    target: {
                      name: 'address',
                      value: addressValue,
                    },
                  } as ChangeEvent<HTMLInputElement>)
                  closeModal()
                }}
              >
                <div className="hover:bg-blue-secondary flex w-full cursor-pointer flex-row items-center justify-start p-1 py-4">
                  <Icon
                    id="place"
                    width={24}
                    height={24}
                    className="text-blue-primary mx-2"
                  />
                  <div className="flex w-full flex-col items-start justify-center">
                    <p className="font-semibold text-black">{doc.place_name}</p>
                    <p className="text-sm text-zinc-500">
                      {doc.road_address_name
                        ? doc.road_address_name
                        : doc.address_name}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ))}
        <div ref={loadMoreRef} className="text-center" />
      </div>
    </div>
  )
}
