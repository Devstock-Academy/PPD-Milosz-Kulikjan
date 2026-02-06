import React from 'react'
import { wrapCSS, wrapTargetImage } from '@/lib/sanitizer'

type CssScreenProps = {
  targetUrl?: string
  editorValue?: string
  outputRef?: React.RefObject<HTMLIFrameElement>
}

const CssScreen = ({ targetUrl, editorValue, outputRef }: CssScreenProps) => {
  if (editorValue !== undefined) {
    return (
      <iframe
        srcDoc={wrapCSS(editorValue)}
        className='flex h-66.5 w-83.25 bg-white'
        title='CSS Result'
      />
    )
  }

  if (targetUrl) {
    return (
      <iframe
        srcDoc={wrapTargetImage(targetUrl)}
        className='flex h-66.5 w-83.25 bg-white'
        title='CSS Pattern'
      />
    )
  }
  return <div className='flex h-66.5 w-83.25 bg-white'></div>
}

export default CssScreen
