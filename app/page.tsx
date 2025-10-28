import SignOutLayout from '@/features/signOutLayout/layout'
import HeroImage from '@/features/landing/components/HeroImage'
import Content from '@/features/landing/components/Content'
import { Landing } from '@/features/landing'

const Home = () => {
  return (
    <SignOutLayout>
      <div className='mx-auto w-full'>
        <Landing />
      </div>
    </SignOutLayout>
  )
}

export default Home
