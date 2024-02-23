import { ComponentPropsType, getComponentConfByType } from '@/components/QuestionComponents'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { changeComponentProps } from '@/store/componentsReducer'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
  const dispatch = useDispatch()

  // 获取当前选中的组件
  const { selectedComponent } = useGetComponentInfo()
  if (!selectedComponent) return <NoProp />

  // 根据组件的 type 获取组件配置，从而获取组件属性 PropComponent
  const { type, props } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (!componentConf) return <NoProp />

  function changeProps(newProps: ComponentPropsType) {
    if (!selectedComponent) return
    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  // 渲染组件属性
  const { PropComponent } = componentConf
  return <PropComponent {...props} onChange={changeProps} />
}

export default ComponentProp
