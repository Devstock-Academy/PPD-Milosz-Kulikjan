'use client'

import Image from 'next/image'
import { Divider, TextLink, NavButton } from '@/components'
import Link from 'next/link'

const SignOutTopbar = () => {
  return (
    <div className='flex w-full items-center justify-between bg-grayBg px-10 py-6.5 text-white shadow-footer'>
      <div className='flex items-center gap-x-10'>
        <p>Devstock.pl</p>
        <Divider />
        <TextLink href='/'>
          <span className='font-medium'>Polityka prywatności</span>
        </TextLink>
        <Divider />
        <TextLink href='/'>Kontakt</TextLink>
      </div>
      <p>💛 Devstock © {new Date().getFullYear()}</p>
    </div>
  )
}

export default SignOutTopbar
