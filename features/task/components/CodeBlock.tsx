import React from 'react'

type CodeBlockProps = {
  label: string
  content: string
}

const CodeBlock = ({ label, content }: CodeBlockProps) => {
  return (
    <div className='flex flex-col'>
      <span>{label}</span>
      <span className='flex w-full rounded-lg bg-lightGrayBg px-4 py-2 shadow-tabBarShadow'>
        {content}
      </span>
    </div>
  )
}

export default CodeBlock
