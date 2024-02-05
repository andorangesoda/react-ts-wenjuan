import React, { FC, useEffect } from 'react'
import { Input } from 'antd'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '@/constant/index'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  const [value, setValue] = React.useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  // 跳转页面，设置 url
  const handleSearch = () => {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }

  // 获取 url 参数，并设置到 value
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const newVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(newVal)
  }, [searchParams])

  return (
    <Search
      size="large"
      style={{ width: '260px' }}
      placeholder="输入关键字"
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      allowClear
    />
  )
}

export default ListSearch
