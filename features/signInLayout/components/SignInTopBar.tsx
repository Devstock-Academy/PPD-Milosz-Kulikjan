'use client'

import Image from 'next/image'
import { Divider, TextLink } from '@/components'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import clsx from 'clsx'
import { AvatarIcon } from '@/icons'

const SignOutTopbar = () => {
  const t = useTranslations('SignInTopbar')
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
          />
        </div>
      </Link>
      <div className='flex items-center gap-x-10'>
        <p className='text-white'>Devstock.pl</p>
        <Divider />
        <AvatarIcon />
        <TextLink variant={'default'} href={`/${locale}/logout`}>
          {t('logoutButton')}
        </TextLink>
      </div>
    </div>
  )
}

export default SignOutTopbar
