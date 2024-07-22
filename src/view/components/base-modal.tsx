import { ReactNode } from 'react'

export  function BaseModal({children} : {children: ReactNode}) {
  return (
    <div  className="absolute inset-0 p-4  md:p-0 flex justify-center items-center bg-black/40 z-10 ">{children}</div>
  )
}
