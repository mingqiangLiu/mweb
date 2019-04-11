let baseUrl = '/api' // 本地代理
/* eslint-disable */

switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'https://www.easy-mock.com/mock/5caabda8c7cd3e64b617ecc7/example/mock' // 测试环境url
    break
  case 'preonline':
    baseUrl = 'https://www.easy-mock.com/mock/5caabda8c7cd3e64b617ecc7/example/mock' // 预上线环境url
    break
  case 'production':
    baseUrl = 'https://www.easy-mock.com/mock/5caabda8c7cd3e64b617ecc7/example/mock' // 生产环境url
    break
}

export default baseUrl