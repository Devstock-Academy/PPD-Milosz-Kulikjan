import Content from './Content'
import HeroImage from './HeroImage'
import { useTranslations } from 'next-intl'

const Landing = () => {
  const t = useTranslations('Content')

  return (
    <div className='w-full'>
      <HeroImage />
      <section className='mx-auto w-full max-w-container px-4'>
        <Content
          paragraphs={[t('paragraph1'), t('paragraph2')]}
          videoId='NKsma2XgjL4'
        />
      </section>
    </div>
  )
}

export default Landing
