import React from 'react'
import SprintCard from './SprintCard'

type SprintsListProps = {
  sprints: any[]
}

const SprintsList = ({ sprints }: SprintsListProps) => {
  return (
    <div className='flex flex-col gap-8 p-8'>
      {sprints.map((sprint) => {
        let sprintNumber = 0
        if (sprint && sprint.sprintNumber !== undefined) {
          sprintNumber = sprint.sprintNumber
        }

        let sprintName = ''
        if (sprint && sprint.sprintName) {
          sprintName = sprint.sprintName
        } else if (sprint && sprint.name) {
          sprintName = sprint.name
        }

        let sprintDescription = ''
        if (sprint && sprint.sprintDescription) {
          sprintDescription = sprint.sprintDescription
        } else if (sprint && sprint.longDescription) {
          sprintDescription = sprint.longDescription
        } else if (sprint && sprint.shortDescription) {
          sprintDescription = sprint.shortDescription
        }

        let numberOfLessons = 0
        if (sprint && sprint.numberOfLessons !== undefined) {
          numberOfLessons = sprint.numberOfLessons
        } else if (sprint && Array.isArray(sprint.activities)) {
          numberOfLessons = sprint.activities.length
        }

        let timeToComplete = 0
        if (sprint && sprint.timeToComplete !== undefined) {
          timeToComplete = sprint.timeToComplete
        } else if (sprint && sprint.duration !== undefined) {
          timeToComplete = sprint.duration
        }

        let tasksCount = 0
        if (sprint && Array.isArray(sprint.tickets)) {
          tasksCount = sprint.tickets.length
        } else if (sprint && sprint.totalTasks !== undefined) {
          tasksCount = sprint.totalTasks
        }

        let difficultyLevel = ''
        if (sprint && sprint.difficultyLevel) {
          difficultyLevel = sprint.difficultyLevel
        }

        let techs: string[] = []
        if (sprint && Array.isArray(sprint.techs)) {
          techs = sprint.techs
        } else if (sprint && Array.isArray(sprint.technologies)) {
          techs = sprint.technologies.map((t: any) => t.name)
        }

        let sprintPhoto = '/images/SprintPhoto.webp'
        if (sprint && sprint.sprintPhoto) {
          sprintPhoto = sprint.sprintPhoto
        }

        let sprintProgress = 0
        if (sprint && sprint.sprintProgress !== undefined) {
          sprintProgress = sprint.sprintProgress
        } else if (sprint && sprint.progress !== undefined) {
          sprintProgress = sprint.progress
        }

        return (
          <SprintCard
            key={`sprint-${sprintNumber}`}
            sprintNumber={sprintNumber}
            sprintName={sprintName}
            sprintDescription={sprintDescription}
            numberOfLessons={numberOfLessons}
            timeToComplete={timeToComplete}
            tasksCount={tasksCount}
            difficultyLevel={difficultyLevel}
            techs={techs}
            sprintPhoto={sprintPhoto}
            sprintProgress={sprintProgress}
          />
        )
      })}
    </div>
  )
}

export default SprintsList
