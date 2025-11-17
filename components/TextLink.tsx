import Link from 'next/link'
import clsx from 'clsx'

type TextLinkProps = {
  href: string
  children: React.ReactNode
  variant?: 'default' | 'blue' | 'orange'
  className?: string
}

const TextLink = ({
  href,
  children,
  variant = 'default',
  className,
}: TextLinkProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        variant === 'default' && 'cursor-pointer text-white',
        variant === 'blue' && 'text-buttonBlue underline',
        variant === 'orange' && 'text-buttonOrange',
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </Link>
  )
}

export default TextLink
