let baseUrl = '/api' // 本地代理
/* eslint-disable */

switch (process.env.NODE_ENV) {
  case 'dev':
    baseUrl = 'http://testserver.qiuduoduo.cn:9080/' // 测试环境url
    break
  case 'pre':
    baseUrl = 'https://pre-server.qiuduoduo.cn' // 预上线环境url
    break
  case 'production':
    baseUrl = 'https://api.qiuduoduo.cn' // 生产环境url
    break
}

export default baseUrl