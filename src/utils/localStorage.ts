import { USERNAME, PASSWORD } from '@/constant/index'

/**
 * 「记住我」相关的操作
 */
export function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME, username)
  localStorage.setItem(PASSWORD, password)
}
export function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME)
  localStorage.removeItem(PASSWORD)
}
export function getUserFromStorage() {
  return {
    username: localStorage.getItem(USERNAME),
    password: localStorage.getItem(PASSWORD),
  }
}

/**
 * user-token
 */
const KEY = 'USER_TOKEN'
export function setToken(token: string) {
  localStorage.setItem(KEY, token)
}
export function getToken() {
  return localStorage.getItem(KEY) || ''
}
export function removeToken() {
  localStorage.removeItem(KEY)
}
