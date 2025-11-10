'use client'

import { Button, Checkbox, Input, TextLink } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import IconWrapper from '@/components/IconWrapper'
import { SocialMediaIconPicker } from '@/features/signOutLayout'

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Email jest wymagany')
    .email('E-mail musi mieć poprawny format'),
  password: z.string().min(1, 'Hasło jest wymagane'),
})

type FormData = z.infer<typeof formSchema>

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  })

  const onSubmit = (data: FormData) => {
    console.log('Dane logowania:', data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex h-fit max-h-registerForm w-full max-w-loginForm flex-col gap-3 bg-grayBg p-8 shadow-formShadow'
      noValidate
    >
      <div className='mb-5 flex'>
        <span className='text-2xl font-extralight'>Zaloguj się</span>
      </div>

      <Input
        testId='email'
        label='Twój e-mail'
        type='email'
        autoComplete='email'
        placeholder='name@example.com'
        {...register('email')}
        error={errors.email?.message}
      />

      <Input
        testId='password'
        label='Hasło'
        type='password'
        autoComplete='current-password'
        placeholder='••••••••••'
        {...register('password')}
        error={errors.password?.message}
      />

      <Checkbox id='remember' label='Zapamiętaj mnie' />
      <Button
        testId='submit'
        type='submit'
        size='lg'
        className='h-10 w-full bg-buttonBlue hover:bg-buttonBlue/80'
      >
        Zaloguj się
      </Button>

      <TextLink variant='blue' href='/login' className='text-sm font-medium'>
        Nie pamiętam hasła
      </TextLink>

      <Button
        type='button'
        size='lg'
        className='h-10 w-full gap-4 bg-darkBg hover:bg-darkBg/80'
      >
        Logowanie przez Github
        <IconWrapper size={24} className='text-white'>
          <SocialMediaIconPicker name='github' />
        </IconWrapper>
      </Button>

      <div className='flex items-center gap-1'>
        <span className='text-sm font-medium'>Nie masz jeszcze konta?</span>
        <TextLink
          href='/register'
          variant='blue'
          className='text-sm font-medium'
        >
          Zarejestruj się
        </TextLink>
      </div>
    </form>
  )
}

export default LoginForm
