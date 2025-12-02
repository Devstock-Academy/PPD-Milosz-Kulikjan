<<<<<<< HEAD
import clsx from 'clsx'
import React from 'react'

type IconWrapperProps = {
  children: React.ReactNode
=======
import { ReactNode } from 'react'
import clsx from 'clsx'

type IconWrapperProps = {
  children: ReactNode
>>>>>>> origin/main
  size?: number | string
  className?: string
}

function IconWrapper({ children, size = 24, className }: IconWrapperProps) {
  return (
    <span
      className={clsx('inline-block', className)}
      style={{ width: size, height: size }}
    >
      {children}
    </span>
  )
}

export default IconWrapper
