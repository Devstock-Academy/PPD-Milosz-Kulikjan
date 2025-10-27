import Content from './Content'
import HeroImage from './HeroImage'
import { useTranslations } from 'next-intl'

const Landing = () => {
  const t = useTranslations('Content')

  return (
    <div>
      <HeroImage />
      <Content
        paragraphs={[t('paragraph1'), t('paragraph2')]}
        videoId='NKsma2XgjL4'
      />
    </div>
  )
}

export default Landing
