import React, { FC } from 'react'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import useLoadQuestionData from '@/hooks/useLoadQuestionData'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '@/store/componentsReducer'

const Edit: FC = () => {
  // 从 ajax 中加载数据，并存到 redux store
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()

  function clearSelectId() {
    // 点击空白处，置空选中组件的id，从而间接取消选中组件的样式
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>Header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>left</div>
          <div className={styles.main} onClick={clearSelectId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  )
}

export default Edit
