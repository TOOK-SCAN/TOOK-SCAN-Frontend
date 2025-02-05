export interface Common<T> {
  success: boolean
  data: T
  error: {
    message: string
    code: number
  }
}

export interface ErrorRes {
  success: false
  data: null
  error: {
    message: string
    code: number
  }
}
