import React, { FC } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { Button, Space } from 'antd'
import { PlusCircleTwoTone, FileTextTwoTone, StarTwoTone, DeleteTwoTone } from '@ant-design/icons'
import { MANAGE_LIST, MANAGE_STAR, MANAGE_TRASH } from '@/router/index'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button type="primary" size="large" icon={<PlusCircleTwoTone />}>
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
