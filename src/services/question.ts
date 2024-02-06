/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { ResDataType } from './axios'

type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

/**
 * 获取单个问卷
 * @param id 问卷ID
 * @returns
 */
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  return (await axios.get(url)) as ResDataType
}

/**
 * 创建问卷
 * @param
 * @returns
 */
export async function createQuestionService(): Promise<ResDataType> {
  const url = `/api/question`
  return (await axios.post(url)) as ResDataType
}

/**
 * 获取问卷列表
 * @param Partial 表示包含 SearchOption 中任意参数即可。为空的话默认赋值为 {} 空对象
 * @returns { params: opt } 表示将 opt 参数拼接到 url 地址后，如 opt={a:1, b:2}则会拼接 ?a=1&b=2
 */
export async function getQuestionListService(
  opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
  const url = `/api/question`
  return (await axios.get(url, { params: opt })) as ResDataType
}

// 更新单个问卷
export async function updateQuestionService(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.patch(url, opt)) as ResDataType
  return data
}

// 复制问卷
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`
  return (await axios.post(url)) as ResDataType
}

// 批量彻底删除
export async function deleteQuestionsService(ids: string[]): Promise<ResDataType> {
  const url = '/api/question'
  return (await axios.delete(url, { data: { ids } })) as ResDataType
}
