import ky from 'ky'
import { devConsole } from '../utils/devConsole'

const createApiClient = (
  prefixUrl: string,
  headers?: Record<string, string>
) => {
  return ky.create({
    prefixUrl: prefixUrl,
    timeout: 3000,
    headers,
    hooks: {
      beforeRequest: [
        (req) => {
          devConsole.log('[Request Config]:', {
            url: req.url,
            method: req.method,
            headers: req.headers,
            body: req.body,
          })
        },
      ],
      afterResponse: [
        async (_req, _options, res) => {
          const responseData = await res
            .clone()
            .json()
            .catch(() => null)

          if (!res.ok) {
            devConsole.error('[Response Error]:', {
              status: res.status,
              statusText: res.statusText,
              body: responseData,
            })
            throw responseData
          }

          devConsole.log('[Response Data]:', responseData)
          return responseData
        },
      ],
    },
    throwHttpErrors: false,
  })
}
const httpInstance = createApiClient(
  `${process.env.NEXT_PUBLIC_APP_URL}/api/proxy`
)

const kyInstance = createApiClient('')

export { httpInstance, kyInstance }
