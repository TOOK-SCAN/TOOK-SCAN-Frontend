import ky from 'ky'
import { devConsole } from '../utils/devConsole'

const createApiClient = (headers: Record<string, string>) => {
  return ky.create({
    prefixUrl: `${process.env.PREFIX_URL}/api/v1`,
    timeout: 3000,
    headers,
    hooks: {
      beforeRequest: [
        (request) => {
          devConsole.log('[Request Config]:', {
            url: request.url,
            method: request.method,
            headers: request.headers,
            body: request.body,
          })
        },
      ],
      afterResponse: [
        async (request, options, response) => {
          const responseData = await response
            .clone()
            .json()
            .catch(() => null)
          devConsole.log('[Response Data]:', responseData)
        },
      ],
      onError: [
        async (error) => {
          const errorInfo = {
            status: error.response?.status,
            message: (await error.response?.text()) || error.message,
          }

          devConsole.error(
            `[API Error - ${error.request?.url}]:`,
            error.message
          )
          devConsole.log('[Custom Error]:', errorInfo)
          if (errorInfo.status === 500) {
            console.warn('[Server Error]: 잠시 후 다시 시도해주세요.')
          }

          throw errorInfo
        },
      ],
    },
  })
}

const apiClient = createApiClient({ 'Content-Type': 'application/json' })

const formDataClient = createApiClient({
  'Content-Type': 'multipart/form-data',
})

export { apiClient, formDataClient }
