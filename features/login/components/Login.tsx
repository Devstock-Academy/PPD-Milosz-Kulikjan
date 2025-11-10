import LoginForm from './LoginForm'

const Login = () => {
  return (
    <div className='relative min-h-screen w-full'>
      <div className='absolute inset-0 z-0 bg-hero bg-cover bg-center' />
      <div className='absolute inset-0 z-10 flex items-center justify-center bg-heroOverlay/90 text-white'>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
