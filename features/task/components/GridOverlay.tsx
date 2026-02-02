import React from 'react'

type GridOverlayProps = {
  show: boolean
  gridSize?: number
}

const GridOverlay = ({ show, gridSize = 30 }: GridOverlayProps) => {
  if (!show) return null

  return (
    <div
      className='pointer-events-none absolute inset-0'
      style={{
        backgroundImage:
          'linear-gradient(0deg, transparent 24%, rgba(211, 84, 0, 0.3) 25%, rgba(211, 84, 0, 0.3) 26%, transparent 27%, transparent 74%, rgba(211, 84, 0, 0.3) 75%, rgba(211, 84, 0, 0.3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(211, 84, 0, 0.3) 25%, rgba(211, 84, 0, 0.3) 26%, transparent 27%, transparent 74%, rgba(211, 84, 0, 0.3) 75%, rgba(211, 84, 0, 0.3) 76%, transparent 77%, transparent)',
        backgroundSize: `${gridSize}px ${gridSize}px`,
      }}
    />
  )
}

export default GridOverlay
