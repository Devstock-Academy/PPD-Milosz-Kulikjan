<<<<<<< HEAD
'use client'
=======
"use client"
>>>>>>> origin/main

import { Button, Checkbox, Input, TextLink } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import IconWrapper from '@/components/IconWrapper'
import { SocialMediaIconPicker } from '@/features/signOutLayout'
import { useTranslations } from 'next-intl'
<<<<<<< HEAD
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

const createFormSchema = (tv: ReturnType<typeof useTranslations>) =>
  z.object({
    email: z.string().min(1, tv('email.required')).email(tv('email.invalid')),
=======

const createFormSchema = (tv: ReturnType<typeof useTranslations>) =>
  z.object({
    email: z
      .string()
      .min(1, tv('email.required'))
      .email(tv('email.invalid')),
>>>>>>> origin/main
    password: z.string().min(1, tv('password.required')),
  })

type FormData = z.infer<ReturnType<typeof createFormSchema>>

const LoginForm = () => {
  const t = useTranslations('LoginForm')
  const tv = useTranslations('Validation')
<<<<<<< HEAD
  const te = useTranslations('Errors')
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [isLoading, setIsLoading] = useState(false)

=======
>>>>>>> origin/main
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createFormSchema(tv)),
    mode: 'onBlur',
  })

<<<<<<< HEAD
  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        let errorMessage = te('loginFailed')

        if (result.error === 'EMAIL_AND_PASSWORD_REQUIRED') {
          errorMessage = te('emailAndPasswordRequired')
        } else if (result.error === 'USER_NOT_FOUND') {
          errorMessage = te('userNotFound')
        } else if (result.error === 'INVALID_PASSWORD') {
          errorMessage = te('invalidPassword')
        }

        enqueueSnackbar(errorMessage, { variant: 'error' })
      } else {
        enqueueSnackbar(te('loginSuccess'), { variant: 'success' })
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error) {
      enqueueSnackbar(te('loginFailed'), { variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGithubLogin = async () => {
    setIsLoading(true)
    try {
      await signIn('github', { callbackUrl: '/dashboard' })
    } catch (error) {
      enqueueSnackbar(te('loginFailed'), { variant: 'error' })
      setIsLoading(false)
    }
=======
  const onSubmit = (data: FormData) => {
    console.log('Dane logowania:', data)
>>>>>>> origin/main
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex h-fit max-h-registerForm w-full max-w-loginForm flex-col gap-3 bg-grayBg p-8 shadow-formShadow'
      noValidate
    >
      <div className='mb-5 flex'>
        <span className='text-2xl font-extralight'>{t('title')}</span>
      </div>
      <Input
        testId='email'
        label={t('email.label')}
        type='email'
        autoComplete='email'
        placeholder={t('email.placeholder')}
        {...register('email')}
        error={errors.email?.message}
<<<<<<< HEAD
        disabled={isLoading}
=======
>>>>>>> origin/main
      />
      <Input
        testId='password'
        label={t('password.label')}
        type='password'
        autoComplete='current-password'
        placeholder={t('password.placeholder')}
        {...register('password')}
        error={errors.password?.message}
<<<<<<< HEAD
        disabled={isLoading}
=======
>>>>>>> origin/main
      />
      <Checkbox id='remember' label={t('remember')} />
      <Button
        testId='submit'
        type='submit'
        size='lg'
        className='h-10 w-full bg-buttonBlue hover:bg-buttonBlue/80'
<<<<<<< HEAD
        disabled={isLoading}
      >
        {isLoading ? t('submitting') : t('submit')}
=======
      >
        {t('submit')}
>>>>>>> origin/main
      </Button>
      <TextLink variant='blue' href='/login' className='text-sm font-medium'>
        {t('forgotLink')}
      </TextLink>
      <Button
        type='button'
        size='lg'
        className='h-10 w-full gap-4 bg-darkBg hover:bg-darkBg/80'
<<<<<<< HEAD
        onClick={handleGithubLogin}
        disabled={isLoading}
=======
>>>>>>> origin/main
      >
        {t('oauthGithub')}
        <IconWrapper size={24} className='text-white'>
          <SocialMediaIconPicker name='github' />
        </IconWrapper>
      </Button>
      <div className='flex items-center gap-1'>
        <span className='text-sm font-medium'>{t('noAccount')}</span>
        <TextLink
          href='/register'
          variant='blue'
          className='text-sm font-medium'
        >
          {t('registerLink')}
        </TextLink>
      </div>
    </form>
  )
}

export default LoginForm
