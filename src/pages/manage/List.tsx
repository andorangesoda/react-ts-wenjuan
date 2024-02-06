/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import QuestionCard from '@/components/QuestionCard'
import ListSearch from '@/components/ListSearch'
import styles from './common.module.scss'
import { Spin, Typography, Empty } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { useDebounceFn, useRequest } from 'ahooks'
import { getQuestionListService } from '@/services/question'
import { LIST_PAGE_SIZE } from '@/constant'

const { Title } = Typography

// FC 是 react 一种组件写法，用于声明无状态的函数组件。FC 是一个泛型接口，接受一个类型参数，表示组件的 props。
const List: FC = () => {
  const [started, setStarted] = useState(false)
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)

  const haveMoreData = total > list.length
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword') || ''

  // 1、当页面加载，或 searchParams 变化时执行
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  // 2、当上划加载时执行
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  // 3、防抖，尝试加载
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (!elem) return
      const domRect = elem.getBoundingClientRect()
      if (!domRect) return
      const { bottom } = domRect
      // document.body.clientHeight 表示文档的 body 元素的高度，即浏览器当前可见部分的高度。
      // bottom 表示目标元素底部距离视口顶部的距离。
      if (document.body.clientHeight >= bottom) {
        load()
        setStarted(true)
      }
    },
    { wait: 1000 }
  )

  // 4、真正加载，并解构出 useRequest 中的 loading
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result
        setPage(page + 1)
        // 累计
        setList(list.concat(l))
        setTotal(total)
      },
    }
  )

  // 5、loading
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <Empty description="没有更多数据了" />
    return <span>加载下一页</span>
  }, [started, loading, total, haveMoreData])

  // 6、搜索关键字发生变化，需要重置分页
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {list.length > 0 &&
          list.map((item: any) => {
            return <QuestionCard key={item._id} {...item} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  )
}

export default List
