import React from 'react'
import { useSnackbar } from 'notistack'

import { CssScreen } from '.'

type CssPatternProps = {
  colors?: string[]
  targetUrl?: string
}

const CssPattern = ({ colors = [], targetUrl }: CssPatternProps) => {
  const { enqueueSnackbar } = useSnackbar()

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        enqueueSnackbar(`Skopiowano: ${text}`, {
          variant: 'success',
          autoHideDuration: 1000,
        })
      })
      .catch((err) => {
        console.error('Failed to copy!', err)
        enqueueSnackbar('Nie udało się skopiować', {
          variant: 'error',
          autoHideDuration: 1000,
        })
      })
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-start gap-8'>
      <CssScreen targetUrl={targetUrl} />
      <div className='grid grid-cols-2 gap-4'>
        {colors.map((color, index) => (
          <div
            key={index}
            className='flex h-10 gap-3 rounded-lg bg-borderBg p-2 shadow-contentDiv hover:cursor-pointer'
            onClick={() => copyToClipboard(color)}
          >
            <div
              className='h-6 w-6 rounded-full'
              style={{ backgroundColor: color }}
            />
            <div className='flex'>{color}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CssPattern
