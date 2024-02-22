import React, { FC } from 'react'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import { ComponentInfoType } from '@/store/componentsReducer'
import { getComponentConfByType } from '@/components/QuestionComponents'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'

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
  const { componentList } = useGetComponentInfo()

  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className={styles.canvas}>
      {componentList.map(c => {
        const { fe_id } = c
        return (
          <div key={fe_id} className={styles['component-wrapper']}>
            <div className={styles.component}>{getComponent(c)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default EditCanvas
