export const devConsole = {
  log: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') console.log(...args)
  },
  error: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') console.error(...args)
  },
  warn: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') console.warn(...args)
  },
  info: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') console.info(...args)
  },
  debug: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') console.debug(...args)
  },
  trace: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') console.trace(...args)
  },
  time: (label?: string) => {
    if (process.env.NODE_ENV === 'development') console.time(label)
  },
  timeEnd: (label?: string) => {
    if (process.env.NODE_ENV === 'development') console.timeEnd(label)
  },
  table: (data?: any, columns?: string[]) => {
    if (process.env.NODE_ENV === 'development') console.table(data, columns)
  },
  group: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') console.group(...args)
  },
  groupCollapsed: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') console.groupCollapsed(...args)
  },
  groupEnd: () => {
    if (process.env.NODE_ENV === 'development') console.groupEnd()
  },
  assert: (condition?: boolean, ...args: any[]) => {
    if (process.env.NODE_ENV === 'development')
      console.assert(condition, ...args)
  },
  dir: (item?: any, options?: any) => {
    if (process.env.NODE_ENV === 'development') console.dir(item, options)
  },
  count: (label?: string) => {
    if (process.env.NODE_ENV === 'development') console.count(label)
  },
  countReset: (label?: string) => {
    if (process.env.NODE_ENV === 'development') console.countReset(label)
  },
  clear: () => {
    if (process.env.NODE_ENV === 'development') console.clear()
  },
}
