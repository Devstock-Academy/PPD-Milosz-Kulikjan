'use client'

import { Checkbox as FlowbiteCheckbox, Label } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'

type CheckboxProps = {
  id?: string
  label?: string
  linkText?: string
  linkHref?: string
  error?: string
  testId?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id = 'checkbox',
      label = 'Akceptuję regulamin',
      linkText,
      linkHref,
      error,
      testId,
      ...props
    },
    ref
  ) => {
    return (
      <div className='flex flex-col'>
        <div className='flex items-center gap-2'>
          <FlowbiteCheckbox
            id={id}
            ref={ref}
            data-testid={testId}
            {...props}
            className='
              peer h-5 w-5 cursor-pointer border-0 bg-gray-700 text-white
              checked:bg-buttonBlue focus:border-0 focus:outline-none
              focus:ring-0 focus:ring-transparent focus:ring-offset-0
              focus-visible:outline-none focus-visible:ring-0
              focus-visible:ring-transparent'
          />
          <Label htmlFor={id} className='flex gap-1 text-white'>
            {label}
            {linkText && linkHref && (
              <Link
                href={linkHref}
                className='text-buttonBlue underline'
                onClick={(e) => e.stopPropagation()}
              >
                {linkText}
              </Link>
            )}
          </Label>
        </div>
        <span
          data-testid={testId ? `${testId}Error` : undefined}
          className='min-h-1 mt-1 text-xs font-extralight text-red-500'
        >
          {error ? error : '\u00A0'}
        </span>
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
