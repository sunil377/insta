import { ChangeEventHandler, useState } from 'react'

function useChangeInput() {
  const [value, setValue] = useState('')

  const onChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => setValue(target.value)

  return [value, onChange] as const
}

export { useChangeInput }
