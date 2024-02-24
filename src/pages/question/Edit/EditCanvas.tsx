import React, { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import { ComponentInfoType, changeSelectedId } from '@/store/componentsReducer'
import { getComponentConfByType } from '@/components/QuestionComponents'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import useBindCanvasKeyPress from '@/hooks/useBindCanvasKeyPress'

type PropsType = {
  loading: boolean
}

// 根据组件信息中的 type 获取对应组件
function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null
  const { Component } = componentConf
  return <Component {...props} />
}

// 渲染画布
const EditCanvas: FC<PropsType> = ({ loading }) => {
  // 从 redux stroe 中获取之前加载时，存到 redux store 中的数据
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()

  function handleClick(event: MouseEvent, id: string) {
    // 阻止选择事件冒泡
    event.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  // 绑定快捷键
  useBindCanvasKeyPress()

  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className={styles.canvas}>
      {componentList
        .filter(c => !c.isHidden)
        .map(c => {
          const { fe_id, isLocked } = c

          // 拼接 classname
          const wrapperDefaultClassName = styles['component-wrapper']
          const selectedClassName = styles.selected
          const lockedClassName = styles.locked
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            // 选中时添加样式
            [selectedClassName]: fe_id === selectedId,
            [lockedClassName]: isLocked,
          })

          return (
            <div key={fe_id} className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
              {/* 渲染对应组件 */}
              <div className={styles.component}>{getComponent(c)}</div>
            </div>
          )
        })}
    </div>
  )
}

export default EditCanvas
