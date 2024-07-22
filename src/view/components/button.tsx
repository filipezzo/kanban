import { ComponentProps } from 'react'
import { cn } from '../../app/utils/cn'

interface ButtonProps extends ComponentProps<"button">{
  variant?: boolean
  className?: string
}

export  function Button({variant, className, ...props}:ButtonProps) {
  return (
    <button className={cn("rounded-lg px-4 py-2 hover:opacity-80 transition-opacity bg-indigo-500 text-white disabled:opacity-70 disabled:cursor-not-allowed", variant && 'bg-white text-indigo-500 w-full rounded-3xl ', className)} {...props}/>
  )
}
