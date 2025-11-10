'use client'

import React, { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  className?: string
  testId?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, testId, ...props }, ref) => {
    return (
      <div className='flex w-full flex-col'>
        {label && (
          <label className='block text-sm font-medium text-white'>
            {label}
          </label>
        )}

        <input
          ref={ref}
          {...props}
          data-testid={testId}
          className={clsx(
            'block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
        />

        <span
          data-testid={testId ? `${testId}Error` : undefined}
          className='mt-1 min-h-[1rem] text-xs font-extralight text-red-500'
        >
          {error ? error : '\u00A0'}
        </span>
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
