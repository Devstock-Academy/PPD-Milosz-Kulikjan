'use client'

import Image from 'next/image'
import { Divider, TextLink, NavButton } from '@/components'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const SignOutTopbar = () => {
  const t = useTranslations('SignOutTopbar')
  const locale = useLocale()
  const pathname = usePathname()

  const isRegisterPage = pathname.includes('/register')
  const isLoginPage = pathname.includes('/login')

  return (
    <div className='flex w-full items-center justify-between bg-grayBg px-10 py-4.5 shadow-header'>
      <Link href={`/${locale}/landing`}>
        <div>
          <Image
            src='/images/SignOutLogo.webp'
            alt='Hero Image'
            width={120}
            height={44}
            className='object-contain'
            priority
          />
        </div>
      </Link>

      <div className='flex items-center gap-x-10'>
        <p className='text-white'>Devstock.pl</p>
        <Divider />
        <TextLink
          variant={isLoginPage ? 'orange' : 'default'}
          href={`/${locale}/login`}
        >
          {t('loginButton')}
        </TextLink>

        <NavButton
          href={`/${locale}/register`}
          variant={isRegisterPage ? 'orange' : 'blue'}
        >
          {t('registerButton')}
        </NavButton>
      </div>
    </div>
  )
}

export default SignOutTopbar
