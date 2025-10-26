import React from 'react'
import SignOutTopbar from './components/SignOutTopbar'
import SocialMediaBar from './components/SocialMediaBar'
import Footer from './components/Footer'

const SignOutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <SocialMediaBar />

      <SignOutTopbar />

      <main className='flex-1'>{children}</main>

      <Footer />
    </div>
  )
}

export default SignOutLayout
