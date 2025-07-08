import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { ISubTask, ITask } from '../types/tasks.types';
import { tasks as initialTasks } from '../mock';

interface TaskStore {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  updateTask: (id: string, updated: Partial<ITask>) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => ITask | undefined;
  resetTasks: () => void;
  addSubTask: (taskId: string, subTask: ISubTask) => void;
}

export const useTaskStore = create<TaskStore>()(
  devtools(
    persist(
      (set, get) => ({
        tasks: initialTasks,

        addTask: (task) =>
          set(
            (state) => ({
              tasks: [...state.tasks, task],
            }),
            false,
            'addTask'
          ),

        updateTask: (id, updated) =>
          set(
            (state) => ({
              tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updated } : task)),
            }),
            false,
            'updateTask'
          ),

        deleteTask: (id) =>
          set(
            (state) => ({
              tasks: state.tasks.filter((task) => task.id !== id),
            }),
            false,
            'deleteTask'
          ),

        getTaskById: (id) => {
          return get().tasks.find((task) => task.id === id);
        },

        resetTasks: () => set({ tasks: initialTasks }, false, 'resetTasks'),

        addSubTask: (taskId, subTask) =>
          set(
            (state) => ({
              tasks: state.tasks.map((task) =>
                task.id === taskId ? { ...task, subtasks: [...task.subtasks, subTask] } : task
              ),
            }),
            false,
            'addSubTask'
          ),
      }),
      {
        name: 'task-storage',
      }
    ),
    {
      name: 'TaskStore',
    }
  )
);
