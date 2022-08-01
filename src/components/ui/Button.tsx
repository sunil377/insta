import { useMemo } from 'react'
import { Button as ButtonType } from 'util/type'

function getVariantClasses(variant: variantType) {
  switch (variant) {
    case 'contained':
      return 'bg-primary-main text-white border-0 rounded'
    case 'outlined':
      return 'border-primary-main border text-primary-main rounded'
    case 'text':
      return 'border-0 text-primary-main rounded '
    default:
      return ''
  }
}

function getSizeClasses(size: sizeType) {
  switch (size) {
    case 'base':
      return 'text-sm py-2 px-2.5'
    case 'small':
      return 'text-xs py-1 px-2'
    default:
      return ''
  }
}

export default function Button({
  variant = 'contained',
  size = 'base',
  className = '',
  ...props
}: ButtonProps) {
  const classes = useMemo(
    () => `${getVariantClasses(variant)} ${getSizeClasses(size)} ${className}`,
    [size, variant, className],
  )

  return (
    <button
      className={`inline-flex relative justify-center align-middle disabled:opacity-50 disabled:pointer-events-none capitalize font-semibold text-center text-ellipsis select-none ${classes} `}
      {...props}
    />
  )
}

/* ----------------types--------------------- */

type variantType = 'contained' | 'outlined' | 'text'
type sizeType = 'small' | 'base' | 'large'

interface ButtonProps extends ButtonType {
  variant?: variantType
  size?: sizeType
}
