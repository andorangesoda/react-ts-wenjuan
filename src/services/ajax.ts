/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { message } from 'antd'
import { getToken } from '@/utils/localStorage'

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}
export type ResDataType = {
  // 允许任意的 string 类型 key
  [key: string]: any
}

const instance = axios.create({
  timeout: 10 * 1000,
})

// request 拦截：每次请求都带上 token
instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken()}` // JWT 的固定格式
    return config
  },
  error => Promise.reject(error)
)

// 拦截响应，统一处理 errno 和 msg
instance.interceptors.response.use(res => {
  const { errno, msg, data } = (res.data || {}) as ResType
  if (errno !== 0) {
    if (msg) {
      message.error(msg)
    }
    throw new Error(msg)
  }
  return data as any
})

export default instance
