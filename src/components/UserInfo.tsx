import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { LOGIN } from '@/router'

const UserInfo: FC = () => {
  return (
    <>
      <Link to={LOGIN}>登录</Link>
    </>
  )
}

export default UserInfo
