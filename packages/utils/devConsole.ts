const isDev = process.env.NODE_ENV === 'development'

export const devConsole = new Proxy(console, {
  get(target, prop: keyof Console) {
    return isDev ? target[prop] : () => {}
  },
})
