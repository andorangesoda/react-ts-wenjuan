import React, { FC, useCallback } from 'react'
import { Typography } from 'antd'
import { ComponentConfType, componentConfGroup } from '@/components/QuestionComponents'
import styles from './ComponentLib.module.scss'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import { addComponent } from '@/store/componentsReducer'

const { Title } = Typography

function getComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c
  const dispatch = useDispatch()

  // 缓存函数
  const handleClick = useCallback(() => {
    dispatch(
      addComponent({
        // 前端生成的 id
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    )
  }, [])

  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const ComponentLib: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group
        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            <div>{components.map(c => getComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
