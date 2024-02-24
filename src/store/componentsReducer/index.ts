import { ComponentPropsType } from '@/components/QuestionComponents'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getNextSelectedId } from './utils'

// 组件信息
export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

// 组件状态
export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  // 其他扩展
}

// redux
export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    // 更新选择组件的 id
    changeSelectedId: (draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    },
    // 添加组件
    addComponent: (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload
      const { selectedId, componentList } = draft

      const index = componentList.findIndex(c => c.fe_id === selectedId)
      if (index < 0) {
        // 未选中任何组件
        draft.componentList.push(newComponent)
      } else {
        // 选中了组件，插入到 index 后面
        draft.componentList.splice(index + 1, 0, newComponent)
      }

      draft.selectedId = newComponent.fe_id
    },
    // 修改组件属性
    changeComponentProps: (
      draft: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) => {
      const { fe_id, newProps } = action.payload
      // 当前要修改属性的这个组件
      const curComp = draft.componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.props = {
          ...curComp.props,
          ...newProps,
        }
      }
    },
    // 删除选中的组件
    removeSelectedComponent: (draft: ComponentsStateType) => {
      const { componentList = [], selectedId: removedId } = draft

      // 重新计算 selectedId
      const newSelectedId = getNextSelectedId(removedId, componentList)
      draft.selectedId = newSelectedId

      const index = componentList.findIndex(c => c.fe_id === removedId)
      componentList.splice(index, 1)
    },
    // 隐藏/显示 组件
    changeComponentHidden: (
      draft: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) => {
      const { componentList = [] } = draft
      const { fe_id, isHidden } = action.payload

      // 重新计算 selectedId
      let newSelectedId = ''
      if (isHidden) {
        // 要隐藏
        newSelectedId = getNextSelectedId(fe_id, componentList)
      } else {
        // 要显示
        newSelectedId = fe_id
      }
      draft.selectedId = newSelectedId

      const curComp = componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.isHidden = isHidden
      }
    },
    // 锁定/解锁 组件
    toggleComponentLocked: (
      draft: ComponentsStateType,
      action: PayloadAction<{ fe_id: string }>
    ) => {
      const { fe_id } = action.payload
      const curComp = draft.componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.isLocked = !curComp.isLocked
      }
    },
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
} = componentsSlice.actions
export default componentsSlice.reducer
