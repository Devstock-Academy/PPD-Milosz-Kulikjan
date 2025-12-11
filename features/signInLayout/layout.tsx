import React from 'react'

import { SocialMediaBar } from '@/components/socialMediaBar'

import Sidebar from './components/Sidebar'
import SignInTopBar from './components/SignInTopBar'

const SignInLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-screen flex-col'>
      <SocialMediaBar />
      <SignInTopBar />
      <main
        className='grid flex-1 transition-[grid-template-columns] duration-300'
        style={{
          gridTemplateColumns: 'auto 1fr',
        }}
      >
        <Sidebar />
        <div className='bg-darkBg'>{children}</div>
      </main>
    </div>
  )
}

export default SignInLayout
