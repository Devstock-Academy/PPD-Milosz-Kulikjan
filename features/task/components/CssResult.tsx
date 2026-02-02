import React, { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  ReactCompareSlider as Slider,
  ReactCompareSliderHandle as SliderHandler,
} from 'react-compare-slider'
import { CssScreen } from '.'
import GridOverlay from './GridOverlay'
import { Divider, Toggler } from '@/components'
import Modal from '@/components/Modal'
import { PlayIcon, SortAscendingIcon } from '@/icons'
import { useCode } from '@/context/EditorContext'
import { useCssSolution } from '@/features/task/hooks/useCssSolution'

type CssResultProps = {
  requirements?: number
  targetUrl?: string
}

const CssResult = ({ requirements = 90, targetUrl }: CssResultProps) => {
  const t = useTranslations('CssTask')
  const params = useParams()
  const { data: session } = useSession()
  const taskId = params.id as string
  const userId = session?.user?.id || ''
  const { code } = useCode()
  const [compatibility, setCompatibility] = useState(0)
  const requiredCompatibility = requirements
  const [sliderToggle, setSliderToggle] = useState(false)
  const [gridToggle, setGridToggle] = useState(false)
  const [modalType, setModalType] = useState<'success' | 'failure' | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const outputRef = useRef<HTMLIFrameElement>(null)
  const { mutate: sendSolution, isPending } = useCssSolution(taskId, userId)

  const sliderLabels = [t('showSlider'), t('hideSlider')]
  const gridLabels = [t('showGrid'), t('hideGrid')]

  const handleSliderChange = (checked: boolean) => setSliderToggle(checked)
  const handleGridChange = (checked: boolean) => setGridToggle(checked)

  const handleCheckCompatibility = () => {
    if (!taskId || !userId) return

    sendSolution(
      { solution: code, checkOnly: true },
      {
        onSuccess: (result) => {
          setCompatibility(Math.round(result.similarity))
        },
        onError: (error) => {
          setErrorMessage(error.message)
          setModalType('failure')
          setIsModalOpen(true)
        },
      }
    )
  }

  const handleSubmitSolution = () => {
    if (!taskId || !userId) return

    sendSolution(
      { solution: code },
      {
        onSuccess: (result) => {
          const rounded = Math.round(result.similarity)
          setCompatibility(rounded)
          setModalType(rounded >= requiredCompatibility ? 'success' : 'failure')
          setErrorMessage('')
          setIsModalOpen(true)
        },
        onError: (error) => {
          setErrorMessage(error.message)
          setModalType('failure')
          setIsModalOpen(true)
        },
      }
    )
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setModalType(null)
    setErrorMessage('')
  }

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
          <button
            onClick={handleCheckCompatibility}
            disabled={isPending}
            className='flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-clockActive disabled:opacity-60'
          >
            {t('checkCompatibility')}
            <PlayIcon />
          </button>
          <button
            onClick={handleSubmitSolution}
            disabled={isPending}
            className='flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-buttonBlue disabled:opacity-60'
          >
            {t('submitSolution')}
            <SortAscendingIcon />
          </button>
        </div>
      </div>
      {isModalOpen && modalType && (
        <Modal
          onClose={handleCloseModal}
          type={modalType}
          errorMessage={errorMessage}
        />
      )}
    </div>
  )
}

export default CssResult
