import SignOutLayout from '@/features/signOutLayout/layout'
import HeroImage from '@/features/landing/components/HeroImage'
import Content from '@/features/landing/components/Content'
import { Landing } from '@/features/landing'

const Home = () => {
  return (
    <SignOutLayout>
      <div className='mx-auto w-full max-w-[1366px]'>
        <Landing />
      </div>
    </SignOutLayout>
  )
}

export default Home
