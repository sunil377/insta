import { Link, LinkProps } from 'react-router-dom'
import { Button } from 'util/type'

function IconButton({ className = '', ...props }: Button) {
  return (
    <button
      className={`rounded-full inline-grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75 w-8 h-8 ${className}`}
      {...props}
    />
  )
}

function IconLink({ className = '', ...props }: LinkProps) {
  return (
    <Link
      className={`rounded-full inline-grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75 w-8 h-8 ${className}`}
      {...props}
    />
  )
}

export { IconButton, IconLink }
