import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { CssScreen } from '.'
import { Divider, Toggler } from '@/components'
import Modal from '@/components/Modal'
import { PlayIcon, SortAscendingIcon } from '@/icons'
import { useCode } from '@/context/EditorContext'
import { useCssSolution } from '@/features/task/hooks/useCssSolution'

type CssResultProps = {
  requirements: number
  targetUrl?: string
}

const CssResult = ({ requirements, targetUrl }: CssResultProps) => {
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
  const outputRef = React.useRef<HTMLIFrameElement>(null)
  const { mutate: sendSolution, isPending } = useCssSolution(taskId, userId)
  const [firstToggle, setFirstToggle] = useState(false)
  const [secondToggle, setSecondToggle] = useState(false)

  const sliderLabels = [t('showSlider'), t('hideSlider')]
  const gridLabels = [t('showGrid'), t('hideGrid')]

  const handleSliderChange = (checked: boolean) => setFirstToggle(checked)
  const handleGridChange = (checked: boolean) => setSecondToggle(checked)

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
    colorClass = 'text-green-500'
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-between gap-8'>
      <CssScreen
        editorValue={code}
        targetUrl={targetUrl}
        outputRef={outputRef}
      />
      <div className='flex w-full flex-col justify-between gap-4'>
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
