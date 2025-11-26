'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Divider, NavButton, TextLink } from '@/components'

const Footer = () => {
  const t = useTranslations('Footer')

  return (
    <div className='flex w-full items-center justify-between bg-grayBg px-10 py-6.5 text-white shadow-footer'>
      <div className='flex items-center gap-x-10'>
        <p>Devstock.pl</p>
        <Divider />
        <TextLink href='/'>
          <span className='font-medium'>{t('privacyPolicy')}</span>
        </TextLink>
        <Divider />
        <TextLink href='/'>{t('contact')}</TextLink>
      </div>
      <p>💛 Devstock © {new Date().getFullYear()}</p>
    </div>
  )
}

export default Footer
