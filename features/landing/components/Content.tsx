'use client'

import { TextLink } from '@/components'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'

type ContentProps = {
  paragraphs?: string[]
  videoId?: string
}

const Content = ({ paragraphs = [], videoId }: ContentProps) => {
  const hasParagraphs = paragraphs.length > 0

  return (
    <div>
      {' '}
      <div
        className={`flex flex-col gap-8 py-15 lg:gap-x-30 ${
          hasParagraphs
            ? 'items-start justify-between lg:flex-row'
            : 'items-center justify-center text-center lg:flex-row-reverse'
        }`}
      >
        <div
          className={`flex flex-1 flex-col gap-8.1875 ${
            !hasParagraphs ? 'items-center justify-center' : ''
          }`}
        >
          <h1 className='text-text-heading font-extrabold text-black'>
            Czego możesz się nauczyć?
          </h1>
          {hasParagraphs &&
            paragraphs.map((text, i) => (
              <p key={i} className='text-xl font-extralight text-black'>
                {text}
              </p>
            ))}
        </div>

        {videoId && (
          <div className='relative w-[643px]'>
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
      <div className='mx-72 my-10 flex flex-col  gap-2 rounded-lg border-2 p-8 shadow-contentDiv'>
        <h1 className='text-3xl font-extralight'>
          Zaufało nam już 400+ kursantów z całego kraju
        </h1>
        <span className='font-extralight'>
          Rozwijamy produkty edukacyjne, prowadzimy akademię programowania,
          tworzymy software dla klientów komercyjnych, prowadzimy body leasing i
          promujemy sport
        </span>
        <TextLink href='/'>
          <span className='text-link'>Poznaj nas {'>'}</span>
        </TextLink>
      </div>
    </div>
  )
}

export default Content
