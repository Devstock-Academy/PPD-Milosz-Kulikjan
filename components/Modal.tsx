'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

type ModalType = 'register' | 'success' | 'failure'

type ModalProps = {
  email?: string
  onClose: () => void
  type?: ModalType
}

const Modal = ({ email, onClose, type = 'register' }: ModalProps) => {
  const t = useTranslations('Modal')
  const modalRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-grayBg bg-opacity-50 backdrop-blur-sm'
      data-testid='modal'
    >
      {type === 'register' && (
        <div
          ref={modalRef}
          className='flex flex-col gap-8 rounded-2xl bg-grayBg p-8 text-center shadow-lg'
        >
          <h2 className='mb-2 text-xl font-extralight'>{t('registerTitle')}</h2>
          {email && (
            <span className='text-sm font-medium'>
              {t('registerLine1', { email })}
            </span>
          )}
          <span className='text-sm font-medium'>{t('registerLine2')}</span>
          <button
            onClick={onClose}
            className='mt-4 w-75 self-center rounded bg-buttonBlue px-4 py-2 text-white hover:bg-buttonBlue/80'
          >
            {t('resend')}
          </button>
        </div>
      )}

      {type === 'success' && (
        <div
          ref={modalRef}
          className='flex h-60 w-175 flex-col gap-8 rounded-xl border border-clockActive bg-grayBg  p-8 text-center shadow-formShadow'
        >
          <h2 className='mb-2 text-2xl font-extralight text-clockActive'>
            {t('successTitle')}
          </h2>
          <span className='text-sm font-medium text-clockActive'>
            {t('successLine')}
          </span>
          <button
            onClick={onClose}
            className='h-10 w-75 self-center rounded bg-clockActive p-2  text-white hover:bg-green-600'
          >
            {t('continue')}
          </button>
        </div>
      )}

      {type === 'failure' && (
        <div
          ref={modalRef}
          className='flex h-60 w-175 flex-col gap-8 rounded-xl border border-buttonRed bg-grayBg  p-8 text-center shadow-formShadow'
        >
          <h2 className='mb-2 text-2xl font-extralight text-buttonRed'>
            {t('failureTitle')}
          </h2>
          <span className='text-sm font-medium text-buttonRed'>
            {t('failureLine')}
          </span>
          <button
            onClick={onClose}
            className='h-10 w-75 self-center rounded bg-buttonRed p-2  text-white hover:bg-red-600'
          >
            {t('continue')}
          </button>
        </div>
      )}
    </div>
  )
}

export default Modal
