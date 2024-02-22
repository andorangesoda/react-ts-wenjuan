export type QuestionTitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean
}

export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: '这是一行标题',
  level: 1,
  isCenter: false,
}