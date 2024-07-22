import { ReactNode } from "react"

interface HeadingProps {
  children: ReactNode
}
export default function Heading({children}:HeadingProps) {
  return (
    <h2 className= "px-8 uppercase tracking-wide font-semibold text-sm ">{children}</h2>
  )
}
