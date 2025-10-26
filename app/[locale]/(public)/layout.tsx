import React from 'react'
import SignOutLayout from '@/features/signOutLayout/layout'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SignOutLayout>{children}</SignOutLayout>
}
