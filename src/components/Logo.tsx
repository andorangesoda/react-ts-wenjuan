import React, { FC, useEffect, useState } from 'react'
import styles from './Logo.module.scss'
import { Space, Typography } from 'antd'
import { PieChartTwoTone } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import useGetUserInfo from '@/hooks/useGetUserInfo'
import { HOME, MANAGE_LIST } from '@/router/index'

const { Title } = Typography

const Logo: FC = () => {
  const { username } = useGetUserInfo()
  const [pathname, setPathname] = useState(HOME)

  // 监听，如果有 username，点击 logo 时跳到列表页面
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_LIST)
    }
  }, [username])

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <PieChartTwoTone />
          </Title>
          <Title>数字洞察</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
