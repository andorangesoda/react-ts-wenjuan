/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
import QuestionCard from '@/components/QuestionCard'
import ListSearch from '@/components/ListSearch'
import styles from './common.module.scss'
import { Spin, Typography } from 'antd'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'

const { Title } = Typography

const Star: FC = () => {
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
  const { list = [] } = data

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>标星问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading &&
          list.length > 0 &&
          list.map((item: any) => {
            return <QuestionCard key={item._id} {...item} />
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Star
