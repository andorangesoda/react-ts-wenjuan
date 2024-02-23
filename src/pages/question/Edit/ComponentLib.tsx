import React, { FC } from 'react'
import { Typography } from 'antd'
import { ComponentConfType, componentConfGroup } from '@/components/QuestionComponents'
import styles from './ComponentLib.module.scss'

const { Title } = Typography

function getComponent(c: ComponentConfType) {
  const { type, Component } = c

  return (
    <div key={type} className={styles.wrapper}>
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
