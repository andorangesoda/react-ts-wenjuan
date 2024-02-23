export type QuestionInputPropsType = {
  title?: string
  placeholder?: string
  onChange?: (newProps: QuestionInputPropsType) => void
}

export const QuestionInputDefaultProps: QuestionInputPropsType = {
  title: '输入框',
  placeholder: '请输入...',
}
