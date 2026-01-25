import React from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useQueryClient } from '@tanstack/react-query'
import Modal from '@/components/Modal'
import { useCode } from '@/context/EditorContext'
import { useTestCode } from '@/features/task/hooks/useTestCode'

const EditorActions = ({ hasErrors }: { hasErrors: boolean }) => {
  const t = useTranslations('EditorActions')
  const params = useParams()
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const id = params.id as string
  const userId = session?.user?.id || ''

  const [modalType, setModalType] = React.useState<
    'success' | 'failure' | null
  >(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const { runCode, code } = useCode()
  const { mutate: submitSolution, isPending } = useTestCode(id, userId)

  const handleRun = async () => {
    await runCode()
  }

  const isValidFunction = (codeStr: string): boolean => {
    const trimmed = codeStr.trim()
    return (
      trimmed.match(/function\s+\w+\s*\(/) !== null ||
      trimmed.match(/const\s+\w+\s*=\s*\(/) !== null ||
      trimmed.match(/const\s+\w+\s*=\s*function/) !== null
    )
  }

  const handleSendCode = () => {
    if (hasErrors) {
      setModalType('failure')
      setErrorMessage(t('syntaxError'))
      setIsModalOpen(true)
      return
    }

    if (!isValidFunction(code)) {
      setModalType('failure')
      setErrorMessage(t('invalidFunction'))
      setIsModalOpen(true)
      return
    }

    submitSolution(
      {
        solution: code,
        variant: 'solution',
      },
      {
        onSuccess: (result) => {
          setModalType(result.allPassed ? 'success' : 'failure')
          setErrorMessage('')
          setIsModalOpen(true)
          if (result.allPassed) {
            queryClient.invalidateQueries({ queryKey: ['task', id, userId] })
          }
        },
        onError: (error) => {
          setModalType('failure')
          setErrorMessage(error.message)
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
        <Modal
          onClose={handleCloseModal}
          type={modalType}
          errorMessage={errorMessage}
        />
      )}
    </>
  )
}

export default EditorActions
