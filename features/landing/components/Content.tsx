'use client'

import { TextLink } from '@/components'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

type ContentProps = {
  paragraphs?: string[]
  videoId?: string
}

const Content = ({ paragraphs = [], videoId }: ContentProps) => {
  const t = useTranslations('Content')
  const hasParagraphs = paragraphs.length > 0

  return (
    <div className='mx-10'>
      <div
        className={clsx(
          'flex flex-col items-center gap-8 py-15 xl:gap-x-30',
          hasParagraphs
            ? 'justify-between xl:flex-row'
            : 'justify-center text-center xl:flex-row-reverse'
        )}
      >
        <div
          className={clsx('flex flex-1 flex-col gap-8.1875', {
            'items-center justify-center': !hasParagraphs,
          })}
        >
          <h1 className='text-text-heading font-extrabold text-black'>
            {t('header')}
          </h1>
          {hasParagraphs &&
            paragraphs.map((text, i) => (
              <p key={i} className='text-xl font-extralight text-black'>
                {text}
              </p>
            ))}
        </div>
        {videoId && (
          <div className='relative w-full max-w-videoMax'>
            <div className='aspect-video w-full overflow-hidden rounded-lg shadow-videoShadow'>
              <div className='relative h-full w-full'>
                <LiteYouTubeEmbed
                  id={videoId}
                  title='Video'
                  poster='hqdefault'
                  noCookie={true}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='mx-0 my-10 flex flex-col gap-2 rounded-lg border-2 p-8 shadow-contentDiv xl:mx-72'>
        <h1 className='text-3xl font-extralight'>{t('bottomCardTitle')}</h1>
        <span className='font-extralight'>{t('bottomCardText')}</span>
        <TextLink href='/'>
          <span className='text-link'>
            {t('bottomCardLink')} {'>'}
          </span>
        </TextLink>
      </div>
    </div>
  )
}

export default Content
