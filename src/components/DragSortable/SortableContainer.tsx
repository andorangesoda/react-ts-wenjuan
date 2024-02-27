/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

type PropsType = {
  children: JSX.Element | JSX.Element[]
  items: Array<{ id: string; [key: string]: any }>
  // 交给实现方去完成
  onDragEnd: (oldIndex: number, newIndex: number) => void
}

const SortableContainer: FC<PropsType> = (props: PropsType) => {
  const { children, items, onDragEnd } = props

  // 拖拽小于 8px 视为手误或其他操作
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  // 拖拽处理
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over == null) return
    if (active.id !== over.id) {
      const oldIndex = items.findIndex(c => c.fe_id === active.id)
      const newIndex = items.findIndex(c => c.fe_id === over.id)
      onDragEnd(oldIndex, newIndex)
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

export default SortableContainer
