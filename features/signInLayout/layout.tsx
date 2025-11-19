import React from 'react'
import Sidebar from './components/Sidebar'
import SignInTopBar from './components/SignInTopBar'
import SocialMediaBar from '@/features/signOutLayout/components/SocialMediaBar'

const SignInLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SocialMediaBar />
      <SignInTopBar />
      <div className='flex'>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

export default SignInLayout
