import React, { FC } from 'react'
import QuestionCard from '@/components/QuestionCard'
import ListSearch from '@/components/ListSearch'
import styles from './common.module.scss'
import { Empty, Typography } from 'antd'

const { Title } = Typography

const rawQuestionList = [
  {
    _id: '2',
    title: '问卷',
    isPubulished: true,
    isStar: true,
    answerCount: 5,
    createdAt: '2024-01-25',
  },
]
const Star: FC = () => {
  //const [questionList, setQuestionList] = useState(rawQuestionList)
  const questionList = rawQuestionList

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
        {questionList.length === 0 && <Empty />}
        {questionList.length > 0 &&
          questionList.map(item => {
            return <QuestionCard key={item._id} {...item} />
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Star
