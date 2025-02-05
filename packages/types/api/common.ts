export interface Common<T> {
  success: boolean
  data: T
  error: {
    message: string
    code: number
  }
}

export interface ErrorRes {
  success: boolean
  data: null
  error: {
    message: string
    code: number
  }
}
