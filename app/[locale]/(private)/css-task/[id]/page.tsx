'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import {
  ActionBar,
  TabSkeleton,
  Description,
  Editor,
  CssPattern,
  CssResult,
} from '@/features/task'
import { CodeProvider } from '@/context/EditorContext'
import { useCssTask } from '@/features/jsTasksList/hooks/useCssTask'

const CssTaskPage = () => {
  const params = useParams()
  const { data: session, status } = useSession()
  const id = params.id as string
  const t = useTranslations('Task')

  const { data: task, isLoading, error } = useCssTask(id)

  if (status === 'loading') return <div>Ładowanie sesji...</div>
  if (!session) return <div>Nie jesteś zalogowany</div>
  if (isLoading) return <div>Ładowanie...</div>
  if (error) return <div>Błąd: {error.message}</div>
  if (!task) return <div>Zadanie nie znalezione</div>

  const descriptionData = {
    category: task.category,
    solutionsCount: 0,
    difficulty: task.difficultyLevel,
    title: task.name,
    description: task.description,
  }

  return (
    <CodeProvider initialCode=''>
      <div className='flex h-full w-full flex-col space-y-5 px-8 pb-8 pt-5 text-white'>
        <ActionBar taskType='css' />
        <div className='flex h-full w-full gap-8'>
          <div className='flex flex-1'>
            <TabSkeleton
              tabs={[{ label: t('description') }, { label: 'Edytor' }]}
              noHeaderBg
            >
              {[
                <Description
                  key='description'
                  data={descriptionData}
                  withoutTab
                  taskType='css'
                />,
                <Editor key='editor' withoutTab withoutActions />,
              ]}
            </TabSkeleton>
          </div>

          <div className='flex flex-col gap-4 xl:flex-row'>
            <TabSkeleton tabs={[{ label: t('result') }]} noHeaderBg>
              <div className='flex h-full w-full justify-center p-4'>
                <CssResult
                  requirements={task.requirements}
                  targetUrl={task.targetUrl}
                />
              </div>
            </TabSkeleton>
            <TabSkeleton tabs={[{ label: t('pattern') }]} noHeaderBg>
              <div className='flex h-full w-full  p-4'>
                <CssPattern colors={task.colors} targetUrl={task.targetUrl} />
              </div>
            </TabSkeleton>
          </div>
        </div>
      </div>
    </CodeProvider>
  )
}

export default CssTaskPage
