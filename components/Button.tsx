import clsx from 'clsx'
import { Button as FlowbiteButton } from 'flowbite-react'
import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  testId?: string
}

const Button = ({
  children,
  onClick,
  size = 'md',
  className,
  type = 'button',
  disabled = false,
  testId,
}: ButtonProps) => {
  return (
    <FlowbiteButton
      size={size}
      onClick={onClick}
      type={type}
      disabled={disabled}
      data-testid={testId}
      className={clsx(
        'focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0',
        className,
        disabled && 'opacity-50'
      )}
    >
      {children}
    </FlowbiteButton>
  )
}

export default Button
