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

export const wrapTargetImage = (imageUrl: string) => {
  return `<style>html,body{width:333px;height:266px;margin:0;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#fff;}img{max-width:100%;max-height:100%;object-fit:contain;display:block;}</style><img src="${imageUrl}" alt="CSS Pattern" />`
}
