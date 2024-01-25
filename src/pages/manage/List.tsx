import React, { FC } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styles from './List.module.scss'

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
  // const [questionList, setQuestionList] = useState(rawQuestionList)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {rawQuestionList.map(item => {
          return <QuestionCard key={item._id} {...item} />
        })}
      </div>
      <div className={styles.footer}>底部-分页</div>
    </>
  )
}

export default List
