import React, { FC } from 'react'
import styles from './Home.module.scss'
import { useNavigate } from 'react-router-dom'
import { MANAGE_LIST } from '@/router/index'
import { Button, Typography } from 'antd'
const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()
  return (
    <div className={styles.container}>
      <Title>问卷 | 调查 | 投票</Title>
      <Paragraph>探索互联网无尽可能性，成为数字时代的建设者!</Paragraph>
      <div className={styles.info}>
        <Button type="default" onClick={() => nav(MANAGE_LIST)}>
          开始使用
        </Button>
      </div>
    </div>
  )
}

export default Home
