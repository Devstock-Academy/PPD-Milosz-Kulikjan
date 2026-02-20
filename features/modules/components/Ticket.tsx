import React from 'react'
import clsx from 'clsx'
import { TicketProps } from '../types'
import { useTranslations } from 'next-intl'

const Ticket = ({
  ticketName,
  ticketNumber,
  ticketDifficultyLevel,
  ticketCategory,
  ticketTaskType,
  ticketCheckResult,
}: TicketProps) => {
  const t = useTranslations('Modal')
  return (
    <div className='flex h-full w-fit max-w-ticket flex-col justify-center gap-4'>
      <div className='flex justify-center gap-4'>
        <div className='flex flex-wrap'>{ticketName}</div>
        <div className='h-fit rounded-lg border-2 px-2 py-1'>
          {ticketNumber}
        </div>
      </div>
      <div className='flex h-0.5 w-full rounded-lg bg-white'></div>
      <div className='flex flex-wrap gap-1.5'>
        <div
          className={clsx(
            'h-fit rounded-lg border-2 px-2 py-1 ',
            (ticketDifficultyLevel === 'easy' ||
              ticketDifficultyLevel === 'Łatwy') &&
              'border-clockActive text-clockActive',
            (ticketDifficultyLevel === 'medium' ||
              ticketDifficultyLevel === 'Średni') &&
              'border-activeSidebarBg text-activeSidebarBg',
            (ticketDifficultyLevel === 'hard' ||
              ticketDifficultyLevel === 'Trudny') &&
              'border-buttonRed text-buttonRed'
          )}
        >
          {ticketDifficultyLevel === 'easy' && 'Łatwy'}
          {ticketDifficultyLevel === 'medium' && 'Średni'}
          {ticketDifficultyLevel === 'hard' && 'Trudny'}
        </div>
        <div className='h-fit rounded-lg border-2 border-buttonBlue px-2 py-1 text-buttonBlue'>
          {ticketCategory}
        </div>
        <div className='h-fit rounded-lg border-2 border-ticketTaskType px-2 py-1 text-ticketTaskType'>
          {ticketTaskType}
        </div>
      </div>
      <div className='flex h-0.5 w-full rounded-lg bg-white'></div>
      <div>
        {t('status')}: {ticketCheckResult}
      </div>
    </div>
  )
}

export default Ticket
