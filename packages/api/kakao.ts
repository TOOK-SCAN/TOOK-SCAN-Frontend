import ky from 'ky'

export interface KakaoKeywordResponse {
  documents: {
    place_name: string
    address_name: string
    road_address_name?: string
    x: string
    y: string
  }[]
}

export interface KakaoAddressResponse {
  documents: {
    address_name: string
    road_address?: {
      address_name: string
      region_1depth_name: string
      region_2depth_name: string
      region_3depth_name: string
    }
    address?: {
      address_name: string
      region_1depth_name: string
      region_2depth_name: string
      region_3depth_name: string
    }
    x: string
    y: string
  }[]
}

export async function searchAddress(
  keyword: string,
  page: string | number = 1,
  size: string | number = 10
) {
  if (!keyword) return { keywordResults: [], addressResults: [] }

  try {
    const validPage = Number(page) > 0 ? Number(page) : 1
    const validSize = Number(size) > 0 ? Number(size) : 10

    // 키워드 검색 (학교명, 건물명 포함)
    const keywordResponse = await ky
      .get('https://dapi.kakao.com/v2/local/search/keyword.json', {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
        searchParams: {
          query: keyword,
          page: validPage.toString(),
          size: validSize.toString(),
        },
      })
      .json<KakaoKeywordResponse>()

    if (!keywordResponse.documents || keywordResponse.documents.length === 0) {
      return { keywordResults: [], addressResults: [] }
    }

    // 첫 번째 검색 결과를 이용하여 주소 검색
    const firstResult = keywordResponse.documents[0]
    const addressQuery =
      firstResult.road_address_name || firstResult.address_name

    const addressResponse = await ky
      .get('https://dapi.kakao.com/v2/local/search/address.json', {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
        searchParams: { query: addressQuery },
      })
      .json<KakaoAddressResponse>()

    return {
      keywordResults: keywordResponse.documents || [],
      addressResults: addressResponse.documents.map((doc) => ({
        address_name: doc.address_name,
        region_1depth_name: doc.road_address?.region_1depth_name || '',
        region_2depth_name: doc.road_address?.region_2depth_name || '',
        region_3depth_name: doc.road_address?.region_3depth_name || '',
        longitude: doc.x,
        latitude: doc.y,
      })),
    }
  } catch (error) {
    console.error('Kakao API 요청 실패:', error)
    return { keywordResults: [], addressResults: [] }
  }
}
