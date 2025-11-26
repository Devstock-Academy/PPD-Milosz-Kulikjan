import {
  FacebookIcon,
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
    facebook: <FacebookIcon />,
    instagram: <InstagramIcon />,
    linkedin: <LinkedinIcon />,
    youtube: <YouTubeIcon />,
    github: <GithubIcon />,
    tiktok: <TikTokIcon />,
  }

  return iconsMap[name] || null
}

export default SocialMediaIconPicker
