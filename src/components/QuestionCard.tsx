import React, { FC } from 'react'
import styles from './QuestionCard.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Divider, Space, Tag } from 'antd'
import {
  StarFilled,
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'

type PropsType = {
  _id: string
  title: string
  isPubulished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate()
  const { _id, title, isPubulished, answerCount, createdAt, isStar } = props
  const QUESTION_EDIT = `/question/edit/${_id}`
  const QUESTION_STAT = `/question/stat/${_id}`
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPubulished ? QUESTION_EDIT : QUESTION_STAT}>
            <Space>
              {title}
              {isStar && <StarFilled />}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPubulished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷: {answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => nav(QUESTION_EDIT)}
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              size="small"
              icon={<LineChartOutlined />}
              onClick={() => nav(QUESTION_STAT)}
              disabled={!isPubulished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button type="text" size="small" icon={isStar ? <StarFilled /> : <StarOutlined />}>
              {isStar ? '取消' : '标星'}
            </Button>
            <Button type="text" size="small" icon={<CopyOutlined />}>
              复制
            </Button>
            <Button type="text" size="small" icon={<DeleteOutlined />}>
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
