import RegistrationForm from './RegistrationForm'

const Register = () => {
  return (
    <div className='relative min-h-screen w-full'>
      <div className='absolute inset-0 z-0 bg-hero bg-cover bg-center' />
      <div className='absolute inset-0 z-10 flex items-center justify-center bg-heroOverlay/80 text-white  backdrop-blur-sm'>
        <RegistrationForm />
      </div>
    </div>
  )
}

export default Register
