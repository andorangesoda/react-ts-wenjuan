import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import useGetUserInfo from './useGetUserInfo'
import { getUserInfoService } from '@/services/user'
import { loginReducer } from '@/store/userReducer'

function useLoadUserData() {
  const dispatch = useDispatch()
  const [waitingUserData, setWaitingUserData] = useState(true)

  // 判断当前 redux store 是否已经存在用户信息
  const { username } = useGetUserInfo()
  useEffect(() => {
    if (username) {
      // 如果 redux store 已经存在用户信息，就不用重新加载了
      setWaitingUserData(false)
      return
    }
    // 如果 redux store 中没有用户信息，则进行加载
    run()
  }, [username])

  // ajax 加载用户信息
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username } = result
      // 存储到 redux store
      dispatch(loginReducer({ username }))
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })

  return { waitingUserData }
}

export default useLoadUserData
