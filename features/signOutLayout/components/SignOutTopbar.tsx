'use client'

import Image from 'next/image'
import { Divider, TextLink, NavButton } from '@/components'
import Link from 'next/link'

const SignOutTopbar = () => {
  return (
    <div className='flex w-full items-center justify-between bg-grayBg px-10 py-4.5 shadow-header'>
      <Link href={'/landing'}>
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
        <TextLink href='/login'>Logowanie</TextLink>
        <NavButton href='/register' variant='blue'>
          Rejestracja
        </NavButton>
      </div>
    </div>
  )
}

export default SignOutTopbar
