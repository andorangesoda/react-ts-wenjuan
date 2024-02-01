import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Space, Typography, Form, Input, Button } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './Register.module.scss'
import { LOGIN } from '@/router/index'

const { Title } = Typography

const Register: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>新用户注册</Title>
        </Space>
      </div>
      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              { required: true, message: '请输入用户名！' },
              { type: 'string', min: 5, max: 20, message: '字符长度在 5-20 之间' },
              { pattern: /^\w+$/, message: '只能是字母/数字/下划线' },
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
          <Form.Item
            name="repassword"
            label="确认密码"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码！' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次密码不一致!'))
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN}>已有账号，登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
