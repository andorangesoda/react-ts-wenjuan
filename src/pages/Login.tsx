import React, { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Space, Typography, Form, Input, Button, Checkbox } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import styles from './Login.module.scss'
import { REGISTER } from '@/router/index'
import { rememberUser, deleteUserFromStorage, getUserFromStorage } from '@/utils/localStorage'

const { Title } = Typography

const Login: FC = () => {
  // 利用 antd 中的 hook 获取
  const [form] = Form.useForm()

  useEffect(() => {
    const { username, password } = getUserFromStorage()
    // 获取到用户信息后，填充到 form 表单中
    console.log('username, password', username, password)
    form.setFieldsValue({ username, password })
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log('Success:', values)
    const { username, password, remember } = values || {}
    if (remember) {
      rememberUser(username, password)
    } else {
      deleteUserFromStorage()
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <LoginOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              { required: true, message: '请输入用户名！' },
              { type: 'string', min: 5, max: 20, message: '字符长度在 5-20 之间' },
              { pattern: /^\w+&/, message: '只能是字母/数字/下划线' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 18 }}>
            <Checkbox>记住我？</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER}>没有账号，注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
