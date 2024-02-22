import { StateType } from '@/store'
import { ComponentsStateType } from '@/store/componentsReducer'
import { useSelector } from 'react-redux'

function useGetComponentInfo() {
  const components = useSelector<StateType>(state => state.components) as ComponentsStateType
  const { componentList = [], selectedId } = components

  return { componentList, selectedId }
}

export default useGetComponentInfo
