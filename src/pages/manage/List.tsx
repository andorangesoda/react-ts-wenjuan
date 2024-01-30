import React, { FC } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'
import { Typography, Empty } from 'antd'

const { Title } = Typography

const rawQuestionList = [
  {
    _id: '1',
    title: '问卷1',
    isPubulished: false,
    isStar: false,
    answerCount: 3,
    createdAt: '2024-01-25',
  },
  {
    _id: '2',
    title: '问卷',
    isPubulished: true,
    isStar: true,
    answerCount: 5,
    createdAt: '2024-01-25',
  },
]

// FC 是 react 一种组件写法，用于声明无状态的函数组件。FC 是一个泛型接口，接受一个类型参数，表示组件的 props。
const List: FC = () => {
  //const [questionList, setQuestionList] = useState(rawQuestionList)
  const questionList = rawQuestionList
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map(item => {
            return <QuestionCard key={item._id} {...item} />
          })}
      </div>
      <div className={styles.footer}>底部-分页</div>
    </>
  )
}

export default List
