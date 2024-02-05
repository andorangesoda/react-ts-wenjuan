import React, { FC, useState } from 'react'
import ListSearch from '@/components/ListSearch'
import styles from './common.module.scss'
import { Typography, Space, Button, Spin, Tag, Table, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  const { data = {}, loading } = useLoadQuestionListData({ isDeleted: true })
  const { list = [] } = data

  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]

  const del = () => {
    confirm({
      title: '确定要彻底删除吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后不可恢复',
      onOk: () => message.success('删除成功！'),
    })
  }

  // 可以把 JSX 片段定义为一个变量
  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <div style={{ border: '1px solid #e8e8e8' }}>
        <Table
          rowKey={q => q._id}
          columns={tableColumns}
          dataSource={list}
          pagination={false}
          rowSelection={{
            type: 'checkbox',
            onChange: selectedRowKeys => {
              setSelectedIds(selectedRowKeys as string[])
            },
          }}
        />
      </div>
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
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
        {!loading && list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Trash
