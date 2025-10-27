'use client'

import { NavButton } from '@/components'
import { DevstockLogo, DevstockText, SmallArrowIcon } from '@/icons'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const HeroImage = () => {
  const t = useTranslations('HeroImage')

  return (
    <div className='relative w-full'>
      <div className='relative mx-auto h-[30rem] w-full'>
        <Image
          src='/images/HeroImage.webp'
          alt='Hero Background'
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#1B2124E5] text-white'>
          <h1 className='text-5xl font-bold md:text-6xl'>{t('headline')}</h1>
          <p className='text-2xl font-extralight'>by</p>
          <div className='flex items-center gap-2'>
            <DevstockLogo />
            <DevstockText />
          </div>

          <span className='whitespace-pre-line text-center text-2xl font-extralight'>
            {t('heroSpan1')}
            {'\n'}
            {t('heroSpan2')}
          </span>

          <div className='flex w-full items-center justify-center gap-8'>
            <NavButton href='/learning' variant='red' size='lg'>
              <span className='pr-2'>{t('buttonStart')}</span>
              <SmallArrowIcon />
            </NavButton>
            <NavButton href='/academy' size='lg'>
              {t('buttonExplore')}
            </NavButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroImage
