import axios from 'axios'
import store from '@/store'

// 创建 axios 实例
let service = axios.create({
  // headers: {'Content-Type': 'application/json'},
  timeout: 60000
})

// 设置 post、put 默认 Content-Type
service.defaults.headers.post['Content-Type'] = 'application/json'
service.defaults.headers.put['Content-Type'] = 'application/json'

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    if (config.method === 'post' || config.method === 'put') {
      // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
      config.data = JSON.stringify(config.data)
    }
    // loading + 1
    store.dispatch('SetLoading', true)
    // 请求发送前进行处理
    return config
  },
  (error) => {
    // 请求错误处理
    // loading 清 0
    setTimeout(function() {
      store.dispatch('SetLoading', 0)
    }, 300)

    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    let { data, headers } = response

    if (headers['x-auth-token']) {
      data.token = headers['x-auth-token']
    }
    // loading - 1
    store.dispatch('SetLoading', false)
    return data
  },
  (error) => {
    let info = {},
      { status, statusText, data } = error.response

    if (!error.response) {
      info = {
        code: 5000,
        msg: 'Network Error'
      }
    } else {
      // 此处整理错误信息格式
      info = {
        code: status,
        data: data,
        msg: statusText
      }
    }
    // loading - 1
    store.dispatch('SetLoading', false)
    return Promise.reject(info)
  }
)

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default function() {
  return service
}
