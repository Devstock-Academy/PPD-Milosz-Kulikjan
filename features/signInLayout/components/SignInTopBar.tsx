'use client'

import Image from 'next/image'
import { Divider } from '@/components'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { AvatarIcon } from '@/icons'
import { signOut } from 'next-auth/react'

const SignOutTopbar = () => {
  const t = useTranslations('SignInTopbar')
  const locale = useLocale()

  const handleLogout = async () => {
    await signOut({ callbackUrl: `/${locale}/landing` })
  }

  return (
    <div className='flex w-full items-center justify-between bg-grayBg px-10 py-4.5 shadow-header'>
      <Link href={`/${locale}/dashboard`}>
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
        <button
          onClick={handleLogout}
          className='text-sm font-medium text-white hover:text-buttonBlue'
        >
          {t('logoutButton')}
        </button>
      </div>
    </div>
  )
}

export default SignOutTopbar
