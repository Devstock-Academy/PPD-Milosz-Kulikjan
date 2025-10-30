'use client'

import Image from 'next/image'
import { Divider, TextLink, NavButton } from '@/components'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'

const SignOutTopbar = () => {
  const t = useTranslations('SignOutTopbar')
  const locale = useLocale()

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
        <TextLink href={`/${locale}/`}>{t('loginButton')}</TextLink>
        <NavButton href={`/${locale}/`} variant='blue'>
          {t('registerButton')}
        </NavButton>
      </div>
    </div>
  )
}

export default SignOutTopbar
