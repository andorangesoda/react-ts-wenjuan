import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '@/layouts/MainLayout'
import ManageLayout from '@/layouts/ManageLayout'
import QuestionLayout from '@/layouts/QuestionLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import List from '@/pages/manage/List'
import Star from '@/pages/manage/Star'
import Trash from '@/pages/manage/Trash'
import Edit from '@/pages/question/Edit'
import Stat from '@/pages/question/Stat'
import NotFound from '@/pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'stat/:id',
        element: <Stat />,
      },
    ],
  },
])

export default router

// 常用常量
export const HOME = '/'
export const LOGIN = '/login'
export const REGISTER = '/register'
export const MANAGE_LIST = '/manage/list'
export const MANAGE_STAR = '/manage/star'
export const MANAGE_TRASH = '/manage/trash'

export function isLoginOrRegister(pathname: string) {
  if ([LOGIN, REGISTER].includes(pathname)) return true
  return false
}

export function isNoNeedUserInfo(pathname: string) {
  if ([HOME, LOGIN, REGISTER].includes(pathname)) return true
  return false
}
