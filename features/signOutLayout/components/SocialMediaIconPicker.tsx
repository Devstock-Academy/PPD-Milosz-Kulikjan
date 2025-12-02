import {
  FacebookIcon,
<<<<<<< HEAD
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TikTokIcon,
  YouTubeIcon,
} from '@/icons'

type SocialIconName =
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'youtube'
  | 'github'
  | 'tiktok'

type Props = {
  name: SocialIconName
}

const SocialMediaIconPicker = ({ name }: Props) => {
  const iconsMap: Record<SocialIconName, JSX.Element> = {
=======
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
>>>>>>> origin/main
    facebook: <FacebookIcon />,
    instagram: <InstagramIcon />,
    linkedin: <LinkedinIcon />,
    youtube: <YouTubeIcon />,
    github: <GithubIcon />,
    tiktok: <TikTokIcon />,
<<<<<<< HEAD
=======
    chevron: <></>,
    'small-arrow': <></>,
>>>>>>> origin/main
  }

  return iconsMap[name] || null
}

export default SocialMediaIconPicker
