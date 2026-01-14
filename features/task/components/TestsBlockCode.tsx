'use client'

import React, { useMemo } from 'react'
import prettier from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'

type CodeProps = {
  code: string
  format?: boolean
}

const TestsBlockCode = ({ code, format = true }: CodeProps) => {
  const formattedCode = useMemo(() => {
    if (!format) return code

    try {
      const result = prettier.format(code, {
        parser: 'babel',
        // @ts-expect-error
        plugins: [parserBabel],
        semi: false,
        singleQuote: true,
      })
      return result.replace(/^;/, '')
    } catch {
      return code
    }
  }, [code, format])

  const lines = formattedCode.trimEnd().split('\n')

  return (
    <pre className='flex whitespace-pre-wrap text-sm'>
      <div className='flex w-full rounded-lg border border-borderBg bg-grayBg shadow-tabBarShadow'>
        <div className='flex w-13.25 flex-col items-center justify-center bg-borderBg text-xs font-bold'>
          {lines.map((_, idx) => (
            <div key={idx}>{idx + 1}</div>
          ))}
        </div>
        <div className='flex flex-col px-2'>
          {lines.map((line, idx) => (
            <div key={idx}>{line || ' '}</div>
          ))}
        </div>
      </div>
    </pre>
  )
}

export default TestsBlockCode
