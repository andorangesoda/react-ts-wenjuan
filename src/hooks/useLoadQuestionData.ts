import { getQuestionService } from '@/services/question'
import { resetComponents } from '@/store/componentsReducer'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

/**
 * 加载问卷数据
 */
function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  // 监听 id 发生变化，执行 ajax 请求加载问卷数据
  useEffect(() => {
    run(id)
  }, [id])

  // 实际请求问卷数据
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('问卷ID不能为空')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
    }
  )

  // 根据获取的 data 设置 redux store
  useEffect(() => {
    if (!data) return
    const { componentList = [] } = data
    dispatch(resetComponents({ componentList }))
  }, [data])

  return { loading, error }
}

export default useLoadQuestionData
