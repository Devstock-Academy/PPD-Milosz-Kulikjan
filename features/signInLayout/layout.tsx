import React from 'react'
import Sidebar from './components/Sidebar'
import SignInTopBar from './components/SignInTopBar'
import SocialMediaBar from '@/features/signOutLayout/components/SocialMediaBar'

const SignInLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-screen flex-col'>
      <SocialMediaBar />
      <SignInTopBar />
      <main className='flex flex-1'>
        <Sidebar />
        <div className='flex-1'>{children}</div>
      </main>
    </div>
  )
}

export default SignInLayout
