import { Button, Checkbox, Input, TextLink, Modal } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'

const formSchema = z
  .object({
    pseudonim: z
      .string()
      .min(1, 'Pseudonim musi zawierać odpowiednią ilość znaków'),
    imie: z.string().min(1, 'Imię musi zawierać odpowiednią ilość znaków'),
    nazwisko: z
      .string()
      .min(1, 'Nazwisko musi zawierać odpowiednią ilość znaków'),
    email: z
      .string()
      .min(1, 'Email jest wymagany')
      .email('E-mail musi mieć poprawny format'),
    password: z
      .string()
      .min(8, 'Hasło musi zawierać odpowiednią ilość znaków')
      .regex(/[A-Z]/, 'Hasło musi zawierać co najmniej jedną dużą literę')
      .regex(/[a-z]/, 'Hasło musi zawierać co najmniej jedną małą literę')
      .regex(/[0-9]/, 'Hasło musi zawierać co najmniej jedną liczbę')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Hasło musi zawierać co najmniej jeden znak specjalny'
      ),
    confirmPassword: z.string().min(1, 'Hasło jest niezgodne'),
    rulesAccepted: z.boolean().refine((val) => val === true, {
      message: 'Musisz zaakceptować zasady i warunki świadczenia usług!',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Hasło jest niezgodne',
  })

type FormData = z.infer<typeof formSchema>

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
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
      className='flex h-full max-h-registerForm w-full max-w-registerForm flex-col gap-3 bg-grayBg p-8 shadow-formShadow'
      noValidate
    >
      <div className='mb-5 flex'>
        <span className='text-2xl font-extralight'>Zarejestruj się</span>
      </div>

      <div className='flex gap-9'>
        <div className='flex-1'>
          <Input
            label='Pseudonim'
            placeholder='Pseudonim'
            {...register('pseudonim')}
            error={errors.pseudonim?.message}
          />
        </div>
        <div className='flex-1'>
          <Input
            label='Imię'
            placeholder='Imię'
            {...register('imie')}
            error={errors.imie?.message}
          />
        </div>
      </div>

      <div className='flex gap-9'>
        <div className='flex-1'>
          <Input
            label='Nazwisko'
            placeholder='Nazwisko'
            {...register('nazwisko')}
            error={errors.nazwisko?.message}
          />
        </div>
        <div className='flex-1'>
          <Input
            label='Twój e-mail'
            autoComplete='email'
            placeholder='name@example.com'
            {...register('email')}
            error={errors.email?.message}
          />
        </div>
      </div>

      <div>
        <Input
          label='Hasło'
          type='password'
          autoComplete='new-password'
          placeholder='••••••••••'
          {...register('password')}
          error={errors.password?.message}
        />
      </div>

      <div>
        <Input
          label='Potwierdź hasło'
          type='password'
          autoComplete='new-password'
          placeholder='••••••••••'
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
      </div>

      <Checkbox
        id='rules'
        label='Akceptuję'
        linkText='zasady i warunki'
        linkHref='register'
        {...register('rulesAccepted')}
        error={errors.rulesAccepted?.message}
      />

      <Button
        type='submit'
        size='lg'
        disabled={isSubmitting}
        className='mb-5 h-10 w-full bg-buttonBlue hover:bg-buttonBlue/80'
      >
        {isSubmitting ? 'Rejestrowanie...' : 'Zarejestruj się'}
      </Button>

      <div className='flex items-center gap-1'>
        <span className='text-sm font-medium'>Już masz konto?</span>
        <TextLink href='login' variant='blue' className='text-sm font-medium'>
          Zaloguj się
        </TextLink>
      </div>

      {showModal && <Modal email={email} onClose={() => setShowModal(false)} />}
    </form>
  )
}

export default RegistrationForm
