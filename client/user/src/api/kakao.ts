import ky from 'ky'

export interface KakaoAddressResponse {
  meta: {
    is_end: boolean
    pageable_count: number
    total_count: number
  }
  documents: {
    address_name: string
    category_group_code?: string
    category_group_name?: string
    category_name?: string
    distance?: string
    id: string
    phone?: string
    place_name: string
    place_url?: string
    road_address_name?: string
    x: string
    y: string
  }[]
}

export default async function searchAddress(
  keyword: string,
  lat: number,
  lng: number,
  page: number,
  size: number
): Promise<KakaoAddressResponse | null> {
  if (!keyword) {
    return null
  }

  try {
    const response = await ky
      .get('https://dapi.kakao.com/v2/local/search/keyword.json', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
        searchParams: {
          query: keyword,
          x: lng.toString(),
          y: lat.toString(),
          page: page.toString(),
          size: size.toString(),
        },
      })
      .json<KakaoAddressResponse>()
    console.log('Kakao API Request Success:', response)
    return response
  } catch (error) {
    console.error('Kakao API Request Failed:', error)
    throw new Error(
      `Kakao search address API request error: ${
        error instanceof Error ? error.message : 'unknown error'
      }`
    )
  }
}
