import React from 'react'
import { innerHTMLsanitizer, wrapCSS } from '@/lib/sanitizer'

type CssScreenProps = {
  targetUrl?: string
  editorValue?: string
  outputRef?: React.RefObject<HTMLIFrameElement>
}

const CssScreen = ({ targetUrl, editorValue, outputRef }: CssScreenProps) => {
  const iframeRefHandler = React.useCallback(
    (node: any) => {
      if (node !== null) {
        const wrappedContent = wrapCSS(editorValue || '')
        innerHTMLsanitizer(node, wrappedContent)
      }
    },
    [editorValue]
  )

  if (editorValue !== undefined) {
    return (
      <iframe
        ref={iframeRefHandler}
        className='flex h-66.5 w-83.25 bg-white'
        title='CSS Result'
      />
    )
  }

  if (targetUrl) {
    return (
      <iframe
        src={targetUrl}
        className='flex h-66.5 w-83.25 bg-white'
        title='CSS Pattern'
      />
    )
  }

  return <div className='flex h-66.5 w-83.25 bg-white'></div>
}

export default CssScreen
