import React from 'react'

import { SocialMediaBar } from '@/components/socialMediaBar'

import Sidebar from './components/Sidebar'
import SignInTopBar from './components/SignInTopBar'

const SignInLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-screen flex-col'>
      <SocialMediaBar />
      <SignInTopBar />
      <main className='flex flex-1'>
        <Sidebar />
        <div className='flex-1 bg-darkBg'>{children}</div>
      </main>
    </div>
  )
}

export default SignInLayout
