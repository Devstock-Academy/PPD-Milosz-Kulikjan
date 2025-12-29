import React from 'react'
import SignInLayout from '@/features/signInLayout/layout'
import { TimerProvider } from '@/features/task/context/TimerContext'

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TimerProvider>
      <SignInLayout>{children}</SignInLayout>
    </TimerProvider>
  )
}
