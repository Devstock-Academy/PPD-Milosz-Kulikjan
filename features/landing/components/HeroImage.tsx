'use client'

import { NavButton } from '@/components'
import { DevstockLogo, DevstockText, SmallArrowIcon } from '@/icons'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const HeroImage = () => {
  const t = useTranslations('HeroImage')

  return (
    <div className='relative w-full' data-testid='hero-image'>
      <div className='relative h-120 w-full'>
        <Image
          src='/images/HeroImage.webp'
          alt='Hero Background'
          fill
          sizes='100vw'
          className='object-cover'
          priority
          style={{ width: '100%' }}
        />
        <div className='absolute inset-0 flex flex-col items-center justify-center gap-3 bg-heroOverlay/90 text-white'>
          <div className='mx-auto w-full max-w-container px-4'>
            <div className='flex flex-col items-center justify-center gap-3'>
              <h1 className='text-5xl font-bold md:text-6xl'>
                {t('headline')}
              </h1>
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
      </div>
    </div>
  )
}

export default HeroImage
