import { IUser } from '@/shared/types';
import { ITask } from '../types';

const avatarBase =
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-';

export const users: IUser[] = [
  { id: 'u1', name: 'Alice Johnson', avatarUrl: `${avatarBase}1.png` },
  { id: 'u2', name: 'Bob Smith', avatarUrl: `${avatarBase}2.png` },
  { id: 'u3', name: 'Charlie Brown', avatarUrl: `${avatarBase}3.png` },
  { id: 'u4', name: 'Diana Prince', avatarUrl: `${avatarBase}4.png` },
  { id: 'u5', name: 'Ethan Clark', avatarUrl: `${avatarBase}5.png` },
  { id: 'u6', name: 'Fiona White', avatarUrl: `${avatarBase}6.png` },
  { id: 'u7', name: 'George Hall', avatarUrl: `${avatarBase}7.png` },
  { id: 'u8', name: 'Hannah Lee', avatarUrl: `${avatarBase}8.png` },
  { id: 'u9', name: 'Ivan Petrov', avatarUrl: `${avatarBase}9.png` },
  { id: 'u10', name: 'Julia Schmidt', avatarUrl: `${avatarBase}10.png` },
];

export const tasks: ITask[] = [
  {
    id: 't1',
    title: 'Design UI',
    status: 'pending',
    progress: 0,
    dueDate: new Date('2025-06-10'),
    users: [users[0], users[3]],
  },
  {
    id: 't2',
    title: 'Set up database',
    status: 'in progress',
    progress: 25,
    dueDate: new Date('2025-06-12'),
    users: [users[1]],
  },
  {
    id: 't3',
    title: 'Implement authentication',
    status: 'done',
    progress: 100,
    dueDate: new Date('2025-06-05'),
    users: [users[2], users[4], users[7]],
  },
  {
    id: 't4',
    title: 'Write documentation',
    status: 'in progress',
    progress: 40,
    dueDate: new Date('2025-06-08'),
    users: [users[5], users[0]],
  },
  {
    id: 't5',
    title: 'Create unit tests',
    status: 'pending',
    progress: 0,
    dueDate: new Date('2025-06-14'),
    users: [users[6]],
  },
  {
    id: 't6',
    title: 'Deploy to staging',
    status: 'in progress',
    progress: 60,
    dueDate: new Date('2025-06-15'),
    users: [users[8], users[3], users[2]],
  },
  {
    id: 't7',
    title: 'Fix reported bugs',
    status: 'in progress',
    progress: 75,
    dueDate: new Date('2025-06-16'),
    users: [users[9]],
  },
  {
    id: 't8',
    title: 'Code review',
    status: 'done',
    progress: 100,
    dueDate: new Date('2025-06-07'),
    users: [users[1], users[5], users[6], users[8]],
  },
  {
    id: 't9',
    title: 'Refactor modules',
    status: 'in progress',
    progress: 50,
    dueDate: new Date('2025-06-20'),
    users: [users[7], users[0], users[9]],
  },
];
