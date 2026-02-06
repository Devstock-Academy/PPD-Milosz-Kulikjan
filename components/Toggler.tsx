import clsx from 'clsx'
import React from 'react'

type TogglerProps = {
  label?: string
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

const Toggler = ({ label, checked, onChange, className }: TogglerProps) => {
  return (
    <label
      className={clsx('inline-flex cursor-pointer items-center', className)}
    >
      <input
        type='checkbox'
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className='peer sr-only'
      />
      <div className='peer relative h-6 w-11 rounded-full bg-lightGrayBg shadow-tabBarShadow after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[""] peer-checked:bg-buttonBlue peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full'></div>
      {label && (
        <span className='ms-3 text-sm font-medium text-white'>{label}</span>
      )}
    </label>
  )
}

export default Toggler
