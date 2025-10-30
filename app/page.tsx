import SignOutLayout from '@/features/signOutLayout/layout'
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
