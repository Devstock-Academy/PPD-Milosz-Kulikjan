import React from 'react'

type CodeBlockProps = React.PropsWithChildren<{
  label: string
}>

const CodeBlock = ({ label, children }: CodeBlockProps) => {
  return (
    <div className='flex flex-col gap-1'>
      <span>{label}</span>
      <div className='flex w-full rounded-lg bg-lightGrayBg px-4 py-2 shadow-tabBarShadow'>
        {children}
      </div>
    </div>
  )
}

export default CodeBlock
