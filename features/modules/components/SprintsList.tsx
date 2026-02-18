import React from 'react'
import SprintCard from './SprintCard'
import type { SprintDetails } from '@/features/modules/types'

type SprintsListProps = {
  sprints: SprintDetails[]
}

const SprintsList = ({ sprints }: SprintsListProps) => {
  return (
    <div className='flex flex-col gap-8 p-8'>
      {sprints.map((sprint) => (
        <SprintCard
          key={`sprint-${sprint.sprintNumber}`}
          sprintNumber={sprint.sprintNumber}
          sprintName={sprint.sprintName}
          sprintDescription={sprint.sprintDescription}
          numberOfLessons={sprint.numberOfLessons}
          timeToComplete={sprint.timeToComplete}
          difficultyLevel={sprint.difficultyLevel}
          techs={sprint.techs}
          sprintPhoto={sprint.sprintPhoto}
          sprintProgress={sprint.sprintProgress}
        />
      ))}
    </div>
  )
}

export default SprintsList
