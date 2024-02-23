import { ComponentPropsType } from '@/components/QuestionComponents'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  // 其他扩展
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    changeSelectedId: (draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    },
  },
})

export const { resetComponents, changeSelectedId } = componentsSlice.actions
export default componentsSlice.reducer
