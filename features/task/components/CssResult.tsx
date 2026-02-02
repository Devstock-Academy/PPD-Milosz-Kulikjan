import React, { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import {
  ReactCompareSlider as Slider,
  ReactCompareSliderHandle as SliderHandler,
} from 'react-compare-slider'
import { CssScreen } from '.'
import GridOverlay from './GridOverlay'
import { Divider, Toggler } from '@/components'
import { PlayIcon, SortAscendingIcon } from '@/icons'
import { useCode } from '@/context/EditorContext'

type CssResultProps = {
  requirements?: number
  targetUrl?: string
}

const CssResult = ({ requirements = 90, targetUrl }: CssResultProps) => {
  const t = useTranslations('CssTask')
  const { code } = useCode()
  const compatibility = 50
  const requiredCompatibility = requirements
  const [sliderToggle, setSliderToggle] = useState(false)
  const [gridToggle, setGridToggle] = useState(false)
  const outputRef = useRef<HTMLIFrameElement>(null)

  const sliderLabels = [t('showSlider'), t('hideSlider')]
  const gridLabels = [t('showGrid'), t('hideGrid')]

  const handleSliderChange = (checked: boolean) => setSliderToggle(checked)
  const handleGridChange = (checked: boolean) => setGridToggle(checked)

  let colorClass = 'text-buttonRed'
  if (compatibility >= requiredCompatibility) {
    colorClass = 'text-clockActive'
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-between gap-8'>
      <div className='relative'>
        {sliderToggle ? (
          <Slider
            itemOne={<CssScreen editorValue={code} outputRef={outputRef} />}
            itemTwo={<CssScreen targetUrl={targetUrl} />}
            handle={
              <SliderHandler
                linesStyle={{
                  transform: 'scale(1.16)',
                  color: '#000000',
                  width: '1px',
                }}
                buttonStyle={{
                  position: 'relative',
                  backdropFilter: undefined,
                  background: '#ffffff',
                  color: '#000000',
                  border: '2px solid #000000',
                  transform: 'scale(0.7)',
                }}
              />
            }
            position={50}
          />
        ) : (
          <CssScreen editorValue={code} outputRef={outputRef} />
        )}
        <GridOverlay show={gridToggle} />
      </div>
      <div className='flex w-full flex-col justify-between gap-4'>
        <div className='flex justify-between'>
          <Toggler
            checked={sliderToggle}
            onChange={handleSliderChange}
            label={sliderLabels[Number(sliderToggle)]}
          />
          <Toggler
            checked={gridToggle}
            onChange={handleGridChange}
            label={gridLabels[Number(gridToggle)]}
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
