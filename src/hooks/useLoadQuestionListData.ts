import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '@/services/question'
import { LIST_SEARCH_PRIMARY_KEY } from '@/constant'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

/**
 * 根据 url 参数获取问卷列表
 * @returns
 */
function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()

  // useRequest 是异步数据管理 Hooks
  const { data, loading, error } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PRIMARY_KEY) || ''
      return await getQuestionListService({ keyword, isStar, isDeleted })
    },
    {
      // 刷新时的依赖项
      refreshDeps: [searchParams],
    }
  )

  return { data, loading, error }
}

export default useLoadQuestionListData
