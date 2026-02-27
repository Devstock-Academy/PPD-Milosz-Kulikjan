'use client'

import React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

import type { TicketProps } from '@/features/modules/types'
import { AttachmentIcon } from '@/icons'

type ModalType = 'register' | 'success' | 'failure' | 'ticket'

type ModalProps = {
  email?: string
  errorMessage?: string
  onClose: () => void
  type?: ModalType
  ticketData?: TicketProps & { ticketDescription?: string }
}

const Modal = ({
  email,
  errorMessage,
  onClose,
  type = 'register',
  ticketData,
}: ModalProps) => {
  const [files, setFiles] = React.useState<File[]>([])
  const t = useTranslations('Modal')
  const tModules = useTranslations('Modules')
  const locale = useLocale()
  const router = useRouter()
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

  const difficultyStyles = {
    easy: 'border-clockActive text-clockActive',
    medium: 'border-activeSidebarBg text-activeSidebarBg',
    hard: 'border-buttonRed text-buttonRed',
  }

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
            {errorMessage || t('failureLine')}
          </span>
          <button
            onClick={onClose}
            className='h-10 w-75 self-center rounded bg-buttonRed p-2  text-white hover:bg-red-600'
          >
            {t('continue')}
          </button>
        </div>
      )}
      {type === 'ticket' && ticketData && (
        <div
          ref={modalRef}
          className='flex  h-106.625 w-175 flex-col gap-4 rounded-2xl bg-grayBg p-8 text-left shadow-lg'
        >
          <div className='flex items-center justify-between'>
            <div className='flex flex-wrap text-2xl'>
              {ticketData.ticketName}
            </div>
            <div>
              {tModules('status')}: {ticketData.ticketCheckResult}
            </div>
          </div>
          <div className='flex h-0.5 w-full rounded-lg bg-white'></div>
          <div>
            <div className='flex justify-between'>
              <div className='flex gap-1.5'>
                <div
                  className={clsx(
                    'h-fit rounded-lg border-2 px-2 py-1',
                    difficultyStyles[ticketData.ticketDifficultyLevel]
                  )}
                >
                  {tModules(ticketData.ticketDifficultyLevel)}
                </div>
                <div className='h-fit rounded-lg border-2 border-buttonBlue px-2 py-1 text-buttonBlue'>
                  {ticketData.ticketCategory}
                </div>
                <div className='h-fit rounded-lg border-2 border-ticketTaskType px-2 py-1 text-ticketTaskType'>
                  {ticketData.ticketTaskType}
                </div>
              </div>

              <div>
                <div className='h-fit w-fit rounded-lg border-2 px-2 py-1'>
                  {ticketData.ticketNumber}
                </div>
              </div>
            </div>
          </div>
          <div className='flex h-0.5 w-full rounded-lg bg-white'></div>
          <div className='flex justify-between gap-21.5'>
            <div className='flex-1'>
              <div className='flex h-10 w-full items-center justify-center rounded-lg border-2'>
                <span>
                  {tModules('status')}: {ticketData.ticketCheckResult}
                </span>
              </div>
            </div>
            <div className='flex flex-1 flex-col items-center'>
              <label
                htmlFor='file-upload'
                className='flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-buttonBlue text-white'
              >
                {t('addAttachment')} {<AttachmentIcon />}
              </label>
              <input
                id='file-upload'
                type='file'
                multiple
                className='hidden'
                onChange={(e) => {
                  setFiles((prev) => [
                    ...prev,
                    ...Array.from(e.target.files ?? []),
                  ])
                }}
              />
              <ul className='mt-2 max-h-24 w-full overflow-y-auto'>
                {files &&
                  files.map((file: File, idx: number) => (
                    <li
                      key={file.name + idx}
                      className=' flex items-center justify-between gap-3  px-1 pr-3 text-xs'
                    >
                      <span>{file.name}</span>
                      <button
                        type='button'
                        className='text-xl '
                        onClick={() =>
                          setFiles((prev: File[]) =>
                            prev.filter((_, i: number) => i !== idx)
                          )
                        }
                      >
                        x
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <button
            onClick={() => {
              const ticketId =
                (ticketData as any).ticketId || ticketData.ticketNumber
              const type =
                (ticketData as any).ticketType ||
                (ticketData.ticketCategory || '').toString().toLowerCase()
              const base = type === 'javascript' ? 'task' : 'css-task'
              router.push(`/${locale}/${base}/${ticketId}`)
              onClose()
            }}
            className='mt-auto flex h-10 w-full items-center justify-center rounded-lg bg-clockActive '
          >
            {t('goToTask')}
          </button>
        </div>
      )}
    </div>
  )
}

export default Modal
