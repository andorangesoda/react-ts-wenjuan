import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { removeSelectedComponent, changeComponentHidden } from '@/store/componentsReducer'
import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId } = useGetComponentInfo()

  // 组件删除
  function handleDelete() {
    dispatch(removeSelectedComponent())
  }
  // 组件隐藏
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
