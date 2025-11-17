"use client"

import { Button, Checkbox, Input, TextLink } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import IconWrapper from '@/components/IconWrapper'
import { SocialMediaIconPicker } from '@/features/signOutLayout'
import { useTranslations } from 'next-intl'

const createFormSchema = (tv: ReturnType<typeof useTranslations>) =>
  z.object({
    email: z
      .string()
      .min(1, tv('email.required'))
      .email(tv('email.invalid')),
    password: z.string().min(1, tv('password.required')),
  })

type FormData = z.infer<ReturnType<typeof createFormSchema>>

const LoginForm = () => {
  const t = useTranslations('LoginForm')
  const tv = useTranslations('Validation')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createFormSchema(tv)),
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
      />
      <Input
        testId='password'
        label={t('password.label')}
        type='password'
        autoComplete='current-password'
        placeholder={t('password.placeholder')}
        {...register('password')}
        error={errors.password?.message}
      />
      <Checkbox id='remember' label={t('remember')} />
      <Button
        testId='submit'
        type='submit'
        size='lg'
        className='h-10 w-full bg-buttonBlue hover:bg-buttonBlue/80'
      >
        {t('submit')}
      </Button>
      <TextLink variant='blue' href='/login' className='text-sm font-medium'>
        {t('forgotLink')}
      </TextLink>
      <Button
        type='button'
        size='lg'
        className='h-10 w-full gap-4 bg-darkBg hover:bg-darkBg/80'
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
