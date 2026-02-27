'use client'

import React, { useState, useEffect } from 'react'
import { ReactSortable } from 'react-sortablejs'
import type { SprintDetails, TicketProps } from '@/features/modules/types'
import Ticket from './Ticket'
import Modal from '@/components/Modal'

type KanbanBoardProps = {
  sprint: SprintDetails
}

type TicketWithId = TicketProps & {
  id: string | number
  ticketId?: string
  ticketType?: string
}

const KanbanBoard = ({ sprint }: KanbanBoardProps) => {
  const initialTickets: TicketWithId[] = (sprint.tickets ?? []).map((t) => ({
    ...t,
    id: (t as any).ticketId ?? t.ticketNumber,
  }))

  const [tickets, setTickets] = useState<TicketWithId[]>(initialTickets)

  useEffect(() => {
    const next = (sprint.tickets ?? []).map((t) => ({
      ...t,
      id: (t as any).ticketId ?? t.ticketNumber,
    }))
    setTickets(next)
  }, [sprint.sprintNumber, JSON.stringify(sprint.tickets)])

  const [modalTicket, setModalTicket] = useState<
    (TicketWithId & { ticketDescription?: string }) | null
  >(null)
  const [isModalOpen, setModalOpen] = useState(false)

  const renderColumn = (
    status: TicketProps['ticketKanbanStatus'],
    title: string
  ) => {
    const ticketsInColumn = tickets.filter(
      (t) => t.ticketKanbanStatus === status
    )
    return (
      <div className='flex h-full w-1/3 flex-col'>
        <div className='flex h-10 w-full items-center justify-center rounded-t-lg bg-activeSidebarBg font-bold text-grayBg shadow-tabBarShadow'>
          {title}
        </div>
        <ReactSortable
          list={ticketsInColumn}
          setList={(updated) => {
            setTickets((prev) => {
              const others = prev.filter((t) => t.ticketKanbanStatus !== status)
              const updatedWithStatus = updated.map((t) => ({
                ...t,
                ticketKanbanStatus: status,
              }))
              return [...others, ...updatedWithStatus]
            })
          }}
          group={{ name: 'kanban', pull: false, put: false }}
          className='flex h-125 w-full flex-col items-center justify-start gap-4 overflow-auto rounded-b-lg bg-borderBg p-4 shadow-tabBarShadow'
        >
          {ticketsInColumn.map((item) => (
            <div
              onClick={() => {
                setModalTicket(item)
                setModalOpen(true)
              }}
              key={item.id}
              className={
                'h-fit w-full cursor-pointer rounded-lg bg-lightGrayBg p-4 text-white shadow-tabBarShadow'
              }
            >
              <Ticket {...item} />
            </div>
          ))}
        </ReactSortable>
      </div>
    )
  }

  return (
    <>
      <div className='flex h-full w-full'>
        <div className='flex h-full w-full gap-4 px-4 py-8 '>
          {renderColumn('todo', 'Do zrobienia')}
          {renderColumn('in-progress', 'W trakcie')}
          {renderColumn('done', 'Ukończone')}
        </div>
      </div>
      {isModalOpen && modalTicket && (
        <Modal
          type='ticket'
          ticketData={modalTicket}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}

export default KanbanBoard
