import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN } from '@/router'
import { Button, message } from 'antd'
import { getToken, removeToken } from '@/utils/localStorage'
import { UserOutlined } from '@ant-design/icons'
import useGetUserInfo from '@/hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '@/store/userReducer'

const UserInfo: FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()

  // 从 redux 中获取
  const { username } = useGetUserInfo()

  function logout() {
    // 清理 redux 中 user 信息
    dispatch(logoutReducer())
    removeToken()
    message.success('退出成功')
    nav(LOGIN)
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {username}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )

  const Login = <Link to={LOGIN}>登录</Link>

  return <div>{username && getToken() ? UserInfo : Login}</div>
}

export default UserInfo
