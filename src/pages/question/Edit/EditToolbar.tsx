import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
} from '@/store/componentsReducer'
import { DeleteOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}

  // 组件删除
  function handleDelete() {
    dispatch(removeSelectedComponent())
  }
  // 组件隐藏
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }
  // 锁定组件
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }))
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
