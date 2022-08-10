import { useCallback, useState } from 'react'

function useModal() {
  const [isOpen, setOpen] = useState(false)
  const openModal = useCallback(() => setOpen(true), [])
  const closeModal = useCallback(() => setOpen(false), [])

  return { isOpen, openModal, closeModal }
}

export { useModal }
