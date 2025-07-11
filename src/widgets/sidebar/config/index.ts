import {
  MessageCircleMore,
  Calendar,
  ChartNoAxesColumnDecreasing,
  Settings,
  Grid2x2,
  Notebook,
  Users,
} from 'lucide-react';
import { PATHNAMES } from '@/shared/constants/pathnames';

export const MAIN_MENU = [
  {
    title: 'Dashboard',
    url: PATHNAMES.DASHBOARD,
    icon: Grid2x2,
  },
  {
    title: 'Message',
    url: PATHNAMES.MESSAGE,
    icon: MessageCircleMore,
  },
  {
    title: 'Insight',
    url: PATHNAMES.INSIGHT,
    icon: ChartNoAxesColumnDecreasing,
  },
  {
    title: 'Team',
    url: PATHNAMES.TEAM,
    icon: Users,
  },
  {
    title: 'Schedule',
    url: PATHNAMES.SCHEDULE,
    icon: Calendar,
  },
  {
    title: 'Report',
    url: PATHNAMES.REPORT,
    icon: Notebook,
  },
  {
    title: 'Settings',
    url: PATHNAMES.SETTINGS,
    icon: Settings,
  },
] as const;

export const projects = [
  {
    title: 'Langing page',
    color: 'blue',
    url: PATHNAMES.HOME,
  },
  {
    title: 'Mobile app',
    color: 'red',
    url: PATHNAMES.HOME,
  },
  {
    title: 'Dashboard',
    color: 'yellow',
    url: PATHNAMES.HOME,
  },
  {
    title: 'Filer',
    color: 'orange',
    url: PATHNAMES.HOME,
  },
  {
    title: 'Branding',
    color: 'green',
    url: PATHNAMES.HOME,
  },
];
