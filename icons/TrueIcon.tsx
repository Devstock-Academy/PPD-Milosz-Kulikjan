type TrueIconProps = {
  color?: 'white' | 'default'
}

const TrueIcon = ({ color = 'default' }: TrueIconProps) => {
  const strokeColor = color === 'white' ? '#ffffff' : '#0E9F6E'

  return (
    <svg
      width='16'
      height='12'
      viewBox='0 0 16 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1 7L5 11L15 1'
        stroke={strokeColor}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default TrueIcon
