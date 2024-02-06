import axios, { ResDataType } from './ajax'

// 注册用户
export async function registerService(username: string, password: string): Promise<ResDataType> {
  const url = '/api/user/register'
  return (await axios.post(url, { username, password })) as ResDataType
}

// 登录
export async function loginService(username: string, password: string): Promise<ResDataType> {
  const url = '/api/user/login'
  return (await axios.post(url, { username, password })) as ResDataType
}

// 获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
  const url = '/api/user/info'
  const data = (await axios.get(url)) as ResDataType
  console.log('user', data)

  return data
}
