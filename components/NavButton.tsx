import Link from 'next/link'
import Button from './Button'

type NavButtonProps = {
  href: string
  children: React.ReactNode
  variant?: 'blue' | 'red' | 'transparent'
  size?: 'sm' | 'md' | 'lg'
}

export default function NavButton({
  href,
  children,
  variant = 'transparent',
  size = 'sm',
}: NavButtonProps) {
  const bgClass = {
    blue: 'bg-buttonBlue text-white hover:bg-buttonBlue/80',
    red: 'bg-buttonRed text-white hover:bg-buttonRed/80',
    transparent:
      'bg-transparent text-white border border-white hover:bg-white/10',
  }[variant]

  return (
    <Link href={href}>
      <Button onClick={() => {}} size={size} className={`px-8.125 ${bgClass}`}>
        {children}
      </Button>
    </Link>
  )
}
