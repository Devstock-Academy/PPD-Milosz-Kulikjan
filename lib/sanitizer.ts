import DOMPurify from 'dompurify'

export const innerHTMLsanitizer = (frame: any, value: any) => {
  if (!frame) return
  let divElement = frame.contentDocument.documentElement
  divElement.innerHTML = DOMPurify.sanitize(value, {
    FORCE_BODY: true,
  })
}

export const wrapCSS = (cssCode: string) => {
  return `<style>body{width:333px;height:266px;margin:0;overflow:hidden;background-color: #ffffff;}</style>${cssCode}`
}
