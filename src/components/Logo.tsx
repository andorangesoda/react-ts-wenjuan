import React, { FC } from 'react'
import styles from './Logo.module.scss'
import { Space, Typography } from 'antd'
import { PieChartTwoTone } from '@ant-design/icons'

const { Title } = Typography

const Logo: FC = () => {
  return (
    <div className={styles.container}>
      <Space>
        <Title>
          <PieChartTwoTone />
        </Title>
        <Title>数字洞察</Title>
      </Space>
    </div>
  )
}

export default Logo
