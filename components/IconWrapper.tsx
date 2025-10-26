import { ReactNode, FC } from 'react'

type IconWrapperProps = {
  children: ReactNode
  size?: number | string
  className?: string
}

const IconWrapper: FC<IconWrapperProps> = ({
  children,
  size = 24,
  className = '',
}) => {
  return (
    <span
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      {children}
    </span>
  )
}

export default IconWrapper
