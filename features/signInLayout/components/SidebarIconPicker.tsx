import React from 'react'
import {
  AdminIcon,
  CalendarIcon,
  DashboardIcon,
  LessonsIcon,
  RankingIcon,
  SettingsIcon,
  TaskIcon,
  VectorIcon,
} from '@/icons'

type SidebarIconName =
  | 'dashboard'
  | 'ranking'
  | 'lessons'
  | 'calendar'
  | 'settings'
  | 'task'
  | 'admin'
  | 'vector'

type Props = {
  name: SidebarIconName
}

const SidebarIconPicker = ({ name }: Props) => {
  switch (name) {
    case 'dashboard':
      return <DashboardIcon />
    case 'ranking':
      return <RankingIcon />
    case 'lessons':
      return <LessonsIcon />
    case 'calendar':
      return <CalendarIcon />
    case 'settings':
      return <SettingsIcon />
    case 'task':
      return <TaskIcon />
    case 'admin':
      return <AdminIcon />
    case 'vector':
      return <VectorIcon />
    default:
      return null
  }
}

export default SidebarIconPicker
