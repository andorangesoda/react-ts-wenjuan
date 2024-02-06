import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN } from '@/router'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '@/services/user'
import { Button, message } from 'antd'
import { getToken, removeToken } from '@/utils/localStorage'
import { UserOutlined } from '@ant-design/icons'

const UserInfo: FC = () => {
  const nav = useNavigate()
  const { data } = useRequest(getUserInfoService)
  const { username } = data || {}

  function logout() {
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
