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
  isRequired: boolean
  isVisible: boolean
}
export type TermsResponse = Common<{ terms: Term[] }>
