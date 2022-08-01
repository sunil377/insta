import { useField } from 'formik'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export default function TextField({
  type = 'text',
  label = '',
  name,
  ...props
}: TextFieldProps) {
  if (!name) {
    throw new Error('TextField component have undefined name property')
  }

  const [getFieldProps, getFieldMeta] = useField(name)
  const { error, value, touched } = getFieldMeta

  return (
    <label className="grid cursor-text text-xs leading-[1.75] border-gray-300 border px-2 py-2 form-input rounded">
      <input
        className="block outline-none col-start-1 row-start-1 border-0 transform transition-transform"
        type={type}
        data-isdirty={value.length > 0}
        autoCorrect="off"
        autoCapitalize="off"
        aria-label={label}
        aria-invalid={Boolean(error && touched)}
        {...props}
        {...getFieldProps}
      />
      <span className="capitalize text-gray-500/80 col-start-1 row-start-1 transform transition-transform origin-left">
        {label}
      </span>
    </label>
  )
}

interface TextFieldProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string
}
