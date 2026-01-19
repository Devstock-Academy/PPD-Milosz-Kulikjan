import React from 'react'

import { SocialMediaBar } from '@/components/socialMediaBar'

import Footer from './components/Footer'
import SignOutTopbar from './components/SignOutTopbar'

const SignOutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-full min-h-screen flex-col'>
      <SocialMediaBar />
      <SignOutTopbar />
      <main className='flex flex-1 flex-col'>{children}</main>
      <Footer />
    </div>
  )
}

export default SignOutLayout
