'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Tooltip } from 'flowbite-react'
import SidebarIconPicker from './SidebarIconPicker'

const Sidebar = () => {
  const t = useTranslations('Sidebar')
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const items: (
    | { icon: 'vector' }
    | {
        href: string
        icon:
          | 'dashboard'
          | 'ranking'
          | 'lessons'
          | 'calendar'
          | 'task'
          | 'settings'
          | 'admin'
      }
  )[] = [
    { icon: 'vector' },
    { href: 'dashboard', icon: 'dashboard' },
    { href: 'ranking', icon: 'ranking' },
    { href: 'lessons', icon: 'lessons' },
    { href: 'calendar', icon: 'calendar' },
    { href: 'task', icon: 'task' },
    { href: 'settings', icon: 'settings' },
    { href: 'admin-panel', icon: 'admin' },
  ]

  const renderMenuItem = (item: (typeof items)[number]) => {
    if (item.icon === 'vector') {
      return (
        <button
          key='vector'
          type='button'
          aria-label='toggle sidebar'
          onClick={() => setOpen((prev) => !prev)}
          className='-ml-2.5 flex items-start justify-center rounded-md text-white'
        >
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-grayBg'>
            <div className={`transition-transform ${open ? '' : 'rotate-180'}`}>
              <SidebarIconPicker name={item.icon} />
            </div>
          </div>
        </button>
      )
    }

    const isActive = pathname.includes(item.href)
    const hasDivider = item.icon === 'task' || item.icon === 'admin'
    const activeColor = isActive ? 'text-activeSidebarBg' : ''

    const menuLink = (
      <Tooltip
        content={t(item.icon)}
        placement='right'
        style='light'
        className={open ? 'hidden' : hasDivider ? 'ml-10' : 'ml-4'}
      >
        <Link
          href={item.href}
          aria-label={item.href}
          className={`group relative flex items-${
            hasDivider ? 'start' : 'center'
          } justify-center rounded-md text-white ${
            item.icon === 'settings' ? '-mt-4' : ''
          }`}
        >
          <div
            className={`transition-transform group-hover:scale-150 ${activeColor}`}
          >
            <SidebarIconPicker name={item.icon} />
          </div>
          {open && (
            <span
              className={`absolute left-6 ml-10 whitespace-nowrap ${activeColor}`}
            >
              {t(item.icon)}
            </span>
          )}
        </Link>
      </Tooltip>
    )

    if (hasDivider) {
      return (
        <div
          key={`${item.icon}-${item.href}`}
          className='flex w-full flex-col items-start gap-4'
        >
          {menuLink}
          <div className='-ml-5 h-px w-sidebar-divider bg-sidebarDivider' />
        </div>
      )
    }

    return (
      <React.Fragment key={`${item.icon}-${item.href}`}>
        {menuLink}
      </React.Fragment>
    )
  }

  return (
    <aside
      className={`sticky top-0 h-screen border-r border-gray-800 bg-darkBg ${
        open ? 'w-55' : 'w-16'
      }`}
    >
      <nav className='flex h-full flex-col items-start gap-8 pl-5 pt-8'>
        {items.map(renderMenuItem)}
      </nav>
    </aside>
  )
}

export default Sidebar
