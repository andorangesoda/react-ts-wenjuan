import { getQuestionService } from '@/services/question'
import { resetComponents } from '@/store/componentsReducer'
import { resetPageInfo } from '@/store/pageInfoReducer'
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
    const {
      title = '',
      desc = '',
      js = '',
      css = '',
      isPublished = false,
      componentList = [],
    } = data

    // 获取默认的 selectedId
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }

    // 把组件存储到 redux store
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))

    // 把 pageInfo 存储到 redux store
    dispatch(resetPageInfo({ title, desc, js, css, isPublished }))
  }, [data])

  return { loading, error }
}

export default useLoadQuestionData
