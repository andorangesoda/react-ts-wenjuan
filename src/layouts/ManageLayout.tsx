import React, { FC } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { Button, Space, message } from 'antd'
import { PlusCircleTwoTone, FileTextTwoTone, StarTwoTone, DeleteTwoTone } from '@ant-design/icons'
import { MANAGE_LIST, MANAGE_STAR, MANAGE_TRASH } from '@/router/index'
import { useRequest } from 'ahooks'
import { createQuestionService } from '@/services/question'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  const { loading, run: handleCreateClick } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result.id}`)
      message.success('创建成功')
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusCircleTwoTone />}
            onClick={handleCreateClick}
            disabled={loading}
          >
            创建问卷
          </Button>
          <Button
            type={pathname.startsWith(MANAGE_LIST) ? 'default' : 'link'}
            size="large"
            icon={<FileTextTwoTone />}
            onClick={() => nav(MANAGE_LIST)}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith(MANAGE_STAR) ? 'default' : 'link'}
            size="large"
            icon={<StarTwoTone />}
            onClick={() => nav(MANAGE_STAR)}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith(MANAGE_TRASH) ? 'default' : 'link'}
            size="large"
            icon={<DeleteTwoTone />}
            onClick={() => nav(MANAGE_TRASH)}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
