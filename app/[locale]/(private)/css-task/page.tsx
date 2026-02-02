import React from 'react'
import { TasksHeader, TasksList } from '@/features/jsTasksList/components'
import { JsTask } from '@/types/JsTask'

const mockCssTasks: JsTask[] = [
  {
    id: '1',
    name: 'CSS Flexbox Layout',
    descriptionStart: 'Stwórz layout używając Flexbox',
    category: 'CSS',
    difficultyLevel: 'EASY',
    sampleInput: [],
    sampleOutput: [],
    tests: [],
    patternFunction: '',
  },
  {
    id: '2',
    name: 'CSS Grid System',
    descriptionStart: 'Zbuduj responsywny grid system',
    category: 'CSS',
    difficultyLevel: 'MEDIUM',
    sampleInput: [],
    sampleOutput: [],
    tests: [],
    patternFunction: '',
  },
  {
    id: '3',
    name: 'CSS Animations',
    descriptionStart: 'Dodaj animacje do elementów',
    category: 'CSS',
    difficultyLevel: 'HARD',
    sampleInput: [],
    sampleOutput: [],
    tests: [],
    patternFunction: '',
  },
]

const CssTask = () => {
  return (
    <div className='flex h-full w-full flex-col space-y-5 px-8 pb-8 pt-8 text-white'>
      <TasksHeader />
      <TasksList mockData={mockCssTasks} useMock={true} taskType='css' />
    </div>
  )
}

export default CssTask
