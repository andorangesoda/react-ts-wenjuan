import { getComponentConfByType } from '@/components/QuestionComponents'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import React, { FC } from 'react'

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
  // 获取当前选中的组件
  const { selectedComponent } = useGetComponentInfo()
  if (!selectedComponent) return <NoProp />

  // 根据组件的 type 获取组件配置，从而获取组件属性 PropComponent
  const { type, props } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (!componentConf) return <NoProp />
  const { PropComponent } = componentConf

  // 渲染组件属性
  return <PropComponent {...props} />
}

export default ComponentProp
