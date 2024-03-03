import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PageInfoType = {
  title: string
  desc?: string
  isPublished?: boolean
}

const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
}

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
      return action.payload
    },
  },
})

export const { resetPageInfo } = pageInfoSlice.actions
export default pageInfoSlice.reducer
