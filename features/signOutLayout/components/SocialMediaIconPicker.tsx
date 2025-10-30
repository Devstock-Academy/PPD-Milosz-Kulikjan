import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YouTubeIcon,
  GithubIcon,
  TikTokIcon,
} from '@/icons'
import { IconName } from '@/icons/iconTypes'

type Props = {
  name: IconName
}

const SocialMediaIconPicker = ({ name }: Props) => {
  const iconsMap: Record<IconName, JSX.Element> = {
    facebook: <FacebookIcon />,
    instagram: <InstagramIcon />,
    linkedin: <LinkedinIcon />,
    youtube: <YouTubeIcon />,
    github: <GithubIcon />,
    tiktok: <TikTokIcon />,
    chevron: <></>,
    'small-arrow': <></>,
  }

  return iconsMap[name] || null
}

export default SocialMediaIconPicker
