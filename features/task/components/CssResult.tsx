import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { CssScreen } from '.'
import { Divider, Toggler } from '@/components'
import { PlayIcon, SortAscendingIcon } from '@/icons'

const CssResult = () => {
  const t = useTranslations('CssTask')
  const compatibility = 50
  const requiredCompatibility = 90
  const [firstToggle, setFirstToggle] = useState(false)
  const [secondToggle, setSecondToggle] = useState(false)

  const sliderLabels = [t('showSlider'), t('hideSlider')]
  const gridLabels = [t('showGrid'), t('hideGrid')]

  const handleSliderChange = (checked: boolean) => setFirstToggle(checked)
  const handleGridChange = (checked: boolean) => setSecondToggle(checked)

  let colorClass = 'text-red-500'
  if (compatibility >= requiredCompatibility) {
    colorClass = 'text-green-500'
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-start gap-8'>
      <CssScreen />
      <div className='flex w-83.25 flex-col justify-between gap-4'>
        <div className='flex justify-between'>
          <Toggler
            checked={firstToggle}
            onChange={handleSliderChange}
            label={sliderLabels[Number(firstToggle)]}
          />
          <Toggler
            checked={secondToggle}
            onChange={handleGridChange}
            label={gridLabels[Number(secondToggle)]}
          />
        </div>

        <div className='flex justify-between'>
          <span className={colorClass}>{`${t(
            'compatibility'
          )}: ${compatibility}%`}</span>
          <Divider />
          <span>{`${t('required')}: ${requiredCompatibility}%`}</span>
        </div>
        <div className='flex h-full w-full flex-col items-center gap-4'>
          <button className='flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-clockActive'>
            {t('checkCompatibility')}
            <PlayIcon />
          </button>
          <button className='flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-buttonBlue'>
            {t('submitSolution')}
            <SortAscendingIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CssResult
