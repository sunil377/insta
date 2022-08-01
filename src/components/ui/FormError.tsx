export default function FormError({
  submitCount,
  errors,
  ...props
}: FormErrorProps) {
  const [err] = Object.values(errors)

  return (
    <p
      role="alert"
      className="text-red-500 text-xs leading-6 capitalize my-0.5 max-w-fit text-center"
      {...props}
    >
      {submitCount > 0 && typeof err === 'string' ? <span>{err}</span> : null}
    </p>
  )
}

interface FormErrorProps {
  submitCount: number
  errors: any
}
