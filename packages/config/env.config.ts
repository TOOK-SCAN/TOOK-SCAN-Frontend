export const ENV = {
  MODE:
    (process.env.NODE_ENV as 'development' | 'production' | 'test') ||
    'production', // 기본값을 production으로 설정
  IS_DEV: process.env.NODE_ENV === 'development',
  IS_PROD: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test',
}
