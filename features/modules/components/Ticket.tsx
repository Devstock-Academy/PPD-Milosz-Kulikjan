import React from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import { TicketProps } from '../types'

const Ticket = ({
  ticketName,
  ticketNumber,
  ticketDifficultyLevel,
  ticketCategory,
  ticketTaskType,
  ticketCheckResult,
}: TicketProps) => {
  const t = useTranslations('Modules')

  const difficultyStyles = {
    easy: 'border-clockActive text-clockActive',
    medium: 'border-activeSidebarBg text-activeSidebarBg',
    hard: 'border-buttonRed text-buttonRed',
  }

  return (
    <div className='flex h-full w-full  flex-col justify-center gap-4'>
      <div className='flex justify-between gap-4'>
        <div className='flex flex-wrap'>{ticketName}</div>
        <div className='h-fit rounded-lg border-2 px-2 py-1'>
          {ticketNumber}
        </div>
      </div>
      <div className='flex h-0.5 w-full rounded-lg bg-white'></div>
      <div className='flex flex-wrap gap-1.5'>
        <div
          className={clsx(
            'h-fit rounded-lg border-2 px-2 py-1',
            difficultyStyles[ticketDifficultyLevel]
          )}
        >
          {t(ticketDifficultyLevel)}
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
