'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

type BreadcrumbProps = {
  moduleTitle?: string
}

const Breadcrumb = ({ moduleTitle }: BreadcrumbProps) => {
  const pathname = usePathname()
  const t = useTranslations('Modules')

  const segments = pathname.split('/').filter(Boolean)
  const locale = segments[0]
  const pathSegments = segments.slice(1)

  return (
    <div className='flex h-10 w-fit rounded-lg bg-grayBg px-5 py-2'>
      <nav className='flex gap-2 text-white'>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1

          const href =
            '/' + [locale, ...pathSegments.slice(0, index + 1)].join('/')

          let label = segment

          if (segment === 'modules') {
            label = t('modules')
          }

          if (segment.startsWith('module-')) {
            const moduleNumber = segment.replace('module-', '')
            label = `${t('module')} ${moduleNumber}`
          }

          return (
            <span key={index} className='flex gap-2'>
              {!isLast ? (
                <>
                  <Link href={href}>{label}</Link>
                  <span>{'>'}</span>
                </>
              ) : (
                <span>{label}</span>
              )}
            </span>
          )
        })}
      </nav>
    </div>
  )
}

export default Breadcrumb
