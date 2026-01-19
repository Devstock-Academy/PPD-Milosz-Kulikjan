import React from 'react'
import { useTranslations } from 'next-intl'
import Modal from '@/components/Modal'
import { useCode } from '@/context/EditorContext'

const EditorActions = ({ hasErrors }: { hasErrors: boolean }) => {
  const t = useTranslations('EditorActions')

  const [modalType, setModalType] = React.useState<
    'success' | 'failure' | null
  >(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const { runCode } = useCode()
  const handleRun = async () => {
    await runCode()
  }

  const handleSendCode = () => {
    if (hasErrors) {
      setModalType('failure')
    } else {
      setModalType('success')
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setModalType(null)
  }

  return (
    <>
      <div className='flex h-15 w-full items-center gap-4 bg-lightGrayBg p-4 shadow-tabBarShadow'>
        <button
          onClick={handleRun}
          className='h-10 flex-1 rounded-lg bg-clockActive'
        >
          {t('runCode')}
        </button>
        <button
          onClick={handleSendCode}
          className='h-10 flex-1 rounded-lg bg-buttonBlue'
        >
          {t('sendSolution')}
        </button>
      </div>

      {isModalOpen && modalType && (
        <Modal onClose={handleCloseModal} type={modalType} />
      )}
    </>
  )
}

export default EditorActions
