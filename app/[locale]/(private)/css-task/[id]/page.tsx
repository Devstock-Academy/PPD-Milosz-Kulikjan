'use client'

import React from 'react'
import { useParams } from 'next/navigation'
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
import { JsTask } from '@/types/JsTask'

const mockCssTasks: Record<string, JsTask> = {
  '1': {
    id: '1',
    name: 'CSS Flexbox Layout',
    descriptionStart:
      'Stwórz layout używając Flexbox. Wyrównaj elementy w kontenerze tak, aby były wycentrowane zarówno pionowo jak i poziomo.',
    descriptionEnd:
      'Twój kod powinien zawierać odpowiednie właściwości CSS dla układu flexbox. Pamiętaj o właściwościach justify-content i align-items.',
    category: 'CSS',
    difficultyLevel: 'EASY',
    sampleInput: [],
    sampleOutput: [],
    tests: [],
    patternFunction: '',
    submissions: 42,
  },
  '2': {
    id: '2',
    name: 'CSS Grid System',
    descriptionStart:
      'Zbuduj responsywny grid system z trzema kolumnami na dużych ekranach.',
    descriptionEnd:
      'Użyj CSS Grid do stworzenia układu, który automatycznie dostosowuje się do rozmiaru ekranu.',
    category: 'CSS',
    difficultyLevel: 'MEDIUM',
    sampleInput: [],
    sampleOutput: [],
    tests: [],
    patternFunction: '',
    submissions: 28,
  },
  '3': {
    id: '3',
    name: 'CSS Animations',
    descriptionStart: 'Dodaj płynne animacje do elementów strony.',
    descriptionEnd:
      'Wykorzystaj @keyframes oraz właściwości animation do stworzenia efektu fade-in.',
    category: 'CSS',
    difficultyLevel: 'HARD',
    sampleInput: [],
    sampleOutput: [],
    tests: [],
    patternFunction: '',
    submissions: 15,
  },
}

const CssTaskPage = () => {
  const params = useParams()
  const id = params.id as string
  const t = useTranslations('Task')

  const task = mockCssTasks[id] || mockCssTasks['1']

  const descriptionData = {
    category: task.category,
    solutionsCount: task.submissions || 0,
    difficulty: task.difficultyLevel,
    title: task.name,
    description:
      task.descriptionStart +
      (task.descriptionEnd ? '\n\n' + task.descriptionEnd : ''),
  }

  return (
    <CodeProvider>
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
            <TabSkeleton tabs={[{ label: 'Wynik kodu' }]} noHeaderBg>
              <div className='flex h-full w-full justify-center p-4'>
                <CssResult />
              </div>
            </TabSkeleton>
            <TabSkeleton tabs={[{ label: 'Wzór' }]} noHeaderBg>
              <div className='flex h-full w-full  p-4'>
                <CssPattern />
              </div>
            </TabSkeleton>
          </div>
        </div>
      </div>
    </CodeProvider>
  )
}

export default CssTaskPage
