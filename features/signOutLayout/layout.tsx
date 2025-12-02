import React from 'react'
<<<<<<< HEAD

import Footer from './components/Footer'
import SignOutTopbar from './components/SignOutTopbar'
import SocialMediaBar from './components/SocialMediaBar'
=======
import SignOutTopbar from './components/SignOutTopbar'
import SocialMediaBar from './components/SocialMediaBar'
import Footer from './components/Footer'
>>>>>>> origin/main

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
