import type { Common } from '@tookscan/types'

export enum TermsType {
  SIGN_UP = 'SIGN_UP',
  SCAN = 'SCAN',
}

export interface Term {
  id: number
  type: TermsType
  title: string
  content: string
  is_required: boolean
  is_visible: boolean
}
export type TermsResponse = Common<{ terms: Term[] }>
