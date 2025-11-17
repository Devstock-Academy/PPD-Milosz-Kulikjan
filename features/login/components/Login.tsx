import LoginForm from './LoginForm'

const Login = () => {
  return (
    <div className='relative flex w-full flex-1 items-center justify-center bg-hero bg-cover bg-center py-16'>
      <div className='absolute inset-0 z-0 bg-heroOverlay/80 backdrop-blur-sm' />
      <div className='relative z-10 flex w-full items-center justify-center text-white'>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
