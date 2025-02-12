import type { Term, TermsResponse, TermsType } from '@/types/'
import { httpInstance } from '@tookscan/config'

export const fetchTerms = async (type: TermsType): Promise<Term[]> => {
  const response = await httpInstance
    .get(`terms/overviews?type=${type}`)
    .json<TermsResponse>()

  return response.data.terms
}
