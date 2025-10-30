import Link from 'next/link'

type TextLinkProps = {
  href: string
  children: React.ReactNode
}

const TextLink = ({ href, children }: TextLinkProps) => {
  return (
    <Link href={href} className='cursor-pointer text-white'>
      {children}
    </Link>
  )
}

export default TextLink
