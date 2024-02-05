/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
import QuestionCard from '@/components/QuestionCard'
import ListSearch from '@/components/ListSearch'
import styles from './common.module.scss'
import { Typography, Spin } from 'antd'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'

const { Title } = Typography

// FC 是 react 一种组件写法，用于声明无状态的函数组件。FC 是一个泛型接口，接受一个类型参数，表示组件的 props。
const List: FC = () => {
  const { data = {}, loading } = useLoadQuestionListData()
  const { list = [] } = data

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
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
      <div className={styles.footer}>上划加载更多...</div>
    </>
  )
}

export default List
