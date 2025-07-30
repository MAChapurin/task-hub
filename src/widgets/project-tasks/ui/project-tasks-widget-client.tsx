'use client';

import React, { useState, startTransition } from 'react';
import { DndContext, closestCorners, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { Task, TaskStatus } from '../types';

import { updateTaskStatus } from '../action/task.action';

import { Column } from './column';
import { EmptyDroppable } from './empty-droppable';
import { SortableTask } from './sortable-task';
import { TaskCard } from './task-card';
import { DragOverlayWrapper } from './drag-overlay-wrapper';

export function ProjectTasksWidgetClient({ initialTasks }: { initialTasks: Task[] }) {
  const [columns, setColumns] = useState<Record<TaskStatus, Task[]>>({
    BACKLOG: initialTasks.filter((t) => t.status === 'BACKLOG'),
    IN_PROGRESS: initialTasks.filter((t) => t.status === 'IN_PROGRESS'),
    DONE: initialTasks.filter((t) => t.status === 'DONE'),
  });

  const [activeId, setActiveId] = useState<string | null>(null);

  const activeTask =
    activeId &&
    Object.values(columns)
      .flat()
      .find((t) => t.id === activeId);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeIdStr = active.id as string;
    const overIdStr = over.id as string;

    let fromCol: TaskStatus | undefined;
    let toCol: TaskStatus | undefined;
    let taskToMove: Task | undefined;

    for (const col of Object.keys(columns) as TaskStatus[]) {
      const found = columns[col].find((t) => t.id === activeIdStr);
      if (found) {
        fromCol = col;
        taskToMove = found;
        break;
      }
    }

    if (!taskToMove || !fromCol) return;

    for (const col of Object.keys(columns) as TaskStatus[]) {
      if (columns[col].some((t) => t.id === overIdStr) || overIdStr === col) {
        toCol = col;
        break;
      }
    }

    if (!toCol || toCol === fromCol) return;

    const now = new Date();
    let startDate: Date | null = taskToMove.startDate ? new Date(taskToMove.startDate) : null;
    let completedAt: Date | null = taskToMove.completedAt ? new Date(taskToMove.completedAt) : null;

    if (toCol === 'IN_PROGRESS') {
      startDate = startDate ?? now;
      completedAt = null;
    } else if (toCol === 'DONE') {
      startDate = startDate ?? new Date(taskToMove.createdAt);
      completedAt = now;
    } else {
      startDate = null;
      completedAt = null;
    }

    const updatedTask = {
      ...taskToMove,
      status: toCol,
      startDate,
      completedAt,
    };

    setColumns((prev) => ({
      ...prev,
      [fromCol!]: prev[fromCol!].filter((t) => t.id !== taskToMove!.id),
      [toCol!]: [...prev[toCol!], updatedTask],
    }));

    startTransition(() => {
      updateTaskStatus(taskToMove.id, toCol, startDate, completedAt).catch(() => {
        setColumns((prev) => ({
          ...prev,
          [toCol!]: prev[toCol!].filter((t) => t.id !== taskToMove!.id),
          [fromCol!]: [...prev[fromCol!], taskToMove!],
        }));
      });
    });
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.keys(columns) as TaskStatus[]).map((status) => (
          <Column key={status} id={status}>
            <SortableContext
              items={columns[status].map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              {columns[status].length === 0 ? (
                <EmptyDroppable id={status} />
              ) : (
                columns[status].map((task) => <SortableTask key={task.id} task={task} />)
              )}
            </SortableContext>
          </Column>
        ))}
      </div>
      <DragOverlayWrapper>
        {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
      </DragOverlayWrapper>
    </DndContext>
  );
}
