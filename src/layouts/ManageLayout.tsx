import React, { FC } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { Button, Space } from 'antd'
import { PlusCircleTwoTone, FileTextTwoTone, StarTwoTone, DeleteTwoTone } from '@ant-design/icons'

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
            type={pathname.startsWith('/manage/list') ? 'default' : 'link'}
            size="large"
            icon={<FileTextTwoTone />}
            onClick={() => nav('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'link'}
            size="large"
            icon={<StarTwoTone />}
            onClick={() => nav('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'link'}
            size="large"
            icon={<DeleteTwoTone />}
            onClick={() => nav('/manage/trash')}
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
