import React, { useEffect, useRef } from 'react'

interface ModalProps {
  email: string
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ email, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-grayBg bg-opacity-50'>
      <div
        ref={modalRef}
        className='flex flex-col gap-8 rounded-2xl bg-grayBg p-8 text-center shadow-lg'
      >
        <h2 className='mb-2 text-xl font-extralight'>Potwierdź rejestrację!</h2>
        <span className='text-sm font-medium'>
          Przesłaliśmy link aktywacyjny na adres{' '}
          <span className='font-medium'>{email}</span>, prosimy o weryfikację :)
        </span>
        <span className='text-sm font-medium'>
          Mail aktywacyjny nie dotarł?
        </span>

        <button
          onClick={onClose}
          className='w-75 mt-4 self-center rounded bg-buttonBlue px-4 py-2 text-white hover:bg-buttonBlue/80'
        >
          Prześlij ponownie
        </button>
      </div>
    </div>
  )
}

export default Modal
