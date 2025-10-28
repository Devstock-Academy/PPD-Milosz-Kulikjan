import { ReactNode } from 'react'
import clsx from 'clsx'

type IconWrapperProps = {
  children: ReactNode
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
