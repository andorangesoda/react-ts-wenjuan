import React, { FC } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Space, Typography, message } from 'antd'
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolbar from './EditToolbar'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { updateQuestionService } from '@/services/question'

const { Title } = Typography

const EditHeader: FC = () => {
  const nav = useNavigate()

  // 保存按钮
  const SaveButton: FC = () => {
    const { id } = useParams()
    const { componentList = [] } = useGetComponentInfo()
    const pageInfo = useGetPageInfo()

    const { loading, run: save } = useRequest(
      async () => {
        if (!id) return
        await updateQuestionService(id, { ...pageInfo, componentList })
      },
      { manual: true }
    )

    // 快捷键
    useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
      event.preventDefault()
      if (!loading) save()
    })

    // 自定保存（不是定期保存，不是定时器）
    useDebounceEffect(
      () => {
        save()
      },
      [componentList, pageInfo],
      {
        wait: 1000,
      }
    )

    return (
      <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
        保存
      </Button>
    )
  }

  // 发布按钮
  const PublishButton: FC = () => {
    const nav = useNavigate()
    const { id } = useParams()
    const { componentList = [] } = useGetComponentInfo()
    const pageInfo = useGetPageInfo()

    const { loading, run: pub } = useRequest(
      async () => {
        if (!id) return
        await updateQuestionService(id, {
          ...pageInfo,
          componentList,
          isPublished: true, // 标志着问卷已经被发布
        })
      },
      {
        manual: true,
        onSuccess() {
          message.success('发布成功')
          nav('/question/stat/' + id) // 发布成功，跳转到统计页面
        },
      }
    )

    return (
      <Button type="primary" onClick={pub} disabled={loading}>
        发布
      </Button>
    )
  }

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
