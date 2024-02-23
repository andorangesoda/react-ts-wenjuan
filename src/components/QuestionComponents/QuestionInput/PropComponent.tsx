import React, { FC, useEffect } from 'react'
import { QuestionInputPropsType } from './interface'
import { Form, Input } from 'antd'

const PropComponent: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder, onChange } = props
  const [form] = Form.useForm()

  // 监听属性变化，即使更新为最新属性
  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])

  // form 表单内容变化时，触发 onChange
  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="vertical"
      onValuesChange={handleValueChange}
      initialValues={{ title, placeholder }}
      form={form}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[
          {
            required: true,
            message: '请输入标题',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
