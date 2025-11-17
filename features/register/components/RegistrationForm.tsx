import { Button, Checkbox, Input, TextLink, Modal } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

const createFormSchema = (tv: ReturnType<typeof useTranslations>) =>
  z
    .object({
      pseudonim: z.string().min(1, tv('nick.required')),
      imie: z.string().min(1, tv('firstName.required')),
      nazwisko: z.string().min(1, tv('lastName.required')),
      email: z.string().min(1, tv('email.required')).email(tv('email.invalid')),
      password: z
        .string()
        .min(8, tv('password.min'))
        .regex(/[A-Z]/, tv('password.uppercase'))
        .regex(/[a-z]/, tv('password.lowercase'))
        .regex(/[0-9]/, tv('password.number'))
        .regex(/[!@#$%^&*(),.?":{}|<>]/, tv('password.special')),
      confirmPassword: z.string().min(1, tv('confirm.required')),
      rulesAccepted: z.boolean().refine((val) => val === true, {
        message: tv('rules.accept'),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: tv('confirm.mismatch'),
    })

type FormData = z.infer<ReturnType<typeof createFormSchema>>

const RegistrationForm = () => {
  const t = useTranslations('RegistrationForm')
  const tv = useTranslations('Validation')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(createFormSchema(tv)),
    mode: 'onBlur',
  })

  const [submitted, setSubmitted] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState('')

  const onSubmit = async (data: FormData) => {
    console.log('Dane formularza:', data)
    setEmail(data.email)
    reset()
    setSubmitted(true)
    setShowModal(true)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex max-h-registerForm w-full max-w-registerForm flex-col gap-3 bg-grayBg p-8 shadow-formShadow'
      noValidate
    >
      <div className='mb-5 flex'>
        <span className='text-2xl font-extralight'>{t('title')}</span>
      </div>
      <div className='flex gap-9'>
        <div className='flex-1'>
          <Input
            testId='nick'
            label={t('nick.label')}
            placeholder={t('nick.placeholder')}
            {...register('pseudonim')}
            error={errors.pseudonim?.message}
          />
        </div>
        <div className='flex-1'>
          <Input
            testId='name'
            label={t('firstName.label')}
            placeholder={t('firstName.placeholder')}
            {...register('imie')}
            error={errors.imie?.message}
          />
        </div>
      </div>
      <div className='flex gap-9'>
        <div className='flex-1'>
          <Input
            testId='lastName'
            label={t('lastName.label')}
            placeholder={t('lastName.placeholder')}
            {...register('nazwisko')}
            error={errors.nazwisko?.message}
          />
        </div>
        <div className='flex-1'>
          <Input
            testId='email'
            label={t('email.label')}
            autoComplete='email'
            placeholder={t('email.placeholder')}
            {...register('email')}
            error={errors.email?.message}
          />
        </div>
      </div>
      <div>
        <Input
          testId='password'
          label={t('password.label')}
          type='password'
          autoComplete='new-password'
          placeholder={t('password.placeholder')}
          {...register('password')}
          error={errors.password?.message}
        />
      </div>
      <div>
        <Input
          testId='confirmPassword'
          label={t('confirm.label')}
          type='password'
          autoComplete='new-password'
          placeholder={t('confirm.placeholder')}
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
      </div>
      <Checkbox
        testId='acceptTerms'
        id='rules'
        label={t('rules.label')}
        linkText={t('rules.linkText')}
        linkHref='register'
        {...register('rulesAccepted')}
        error={errors.rulesAccepted?.message}
      />
      <Button
        testId='registrationSubmit'
        type='submit'
        size='lg'
        disabled={isSubmitting}
        className='mb-5 h-10 w-full bg-buttonBlue hover:bg-buttonBlue/80'
      >
        {isSubmitting ? t('submitting') : t('submit')}
      </Button>
      <div className='flex items-center gap-1'>
        <span className='text-sm font-medium'>{t('hasAccount')}</span>
        <TextLink href='login' variant='blue' className='text-sm font-medium'>
          {t('loginLink')}
        </TextLink>
      </div>
      {showModal && <Modal email={email} onClose={() => setShowModal(false)} />}
    </form>
  )
}

export default RegistrationForm
