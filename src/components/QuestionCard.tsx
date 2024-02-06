import React, { FC, useState } from 'react'
import styles from './QuestionCard.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Divider, Space, Tag, Popconfirm, message } from 'antd'
import { updateQuestionService, duplicateQuestionService } from '@/services/question'
import {
  StarFilled,
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useRequest } from 'ahooks'

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

  // 设置或取消标星
  const [isStarState, setIsStarState] = useState(isStar)
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => await updateQuestionService(_id, { isStar: !isStarState }),
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success(isStarState ? '取消标星' : '标星成功！')
      },
    }
  )

  // 复制
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => await duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess(result) {
        message.success('复制成功')
        nav(`/question/edit/${result.id}`) // 跳转到问卷编辑页
      },
    }
  )

  // 删除
  const [isDeletedState, setIsDeletedState] = useState(false)
  const { loading: delLoading, run: del } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功！')
        setIsDeletedState(true)
      },
    }
  )

  // 已经删除的问卷，不再渲染卡片了
  if (isDeletedState) return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPubulished ? QUESTION_EDIT : QUESTION_STAT}>
            <Space>
              {title}
              {isStarState && <StarFilled />}
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
            <Button
              type="text"
              size="small"
              icon={isStarState ? <StarFilled /> : <StarOutlined />}
              disabled={changeStarLoading}
              onClick={changeStar}
            >
              {isStarState ? '取消' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制该问卷？"
              okText="确定"
              cancelText="取消"
              disabled={duplicateLoading}
              onConfirm={duplicate}
            >
              <Button type="text" size="small" icon={<CopyOutlined />}>
                复制
              </Button>
            </Popconfirm>
            <Popconfirm
              title="确定删除该问卷？"
              okText="确定"
              cancelText="取消"
              disabled={delLoading}
              onConfirm={del}
            >
              <Button type="text" size="small" icon={<DeleteOutlined />}>
                删除
              </Button>
            </Popconfirm>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
