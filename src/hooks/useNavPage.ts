import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import { isLoginOrRegister, isNoNeedUserInfo, MANAGE_LIST, LOGIN } from '../router/index'

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    if (waitingUserData) return
    // 已经登录了
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_LIST)
      }
      return
    }
    // 未登录
    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      nav(LOGIN)
    }
  }, [waitingUserData, username, pathname])
}

export default useNavPage
