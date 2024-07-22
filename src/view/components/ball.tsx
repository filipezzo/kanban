import { cn } from "../../app/utils/cn";

interface BallProps{
  color: string
}

export function Ball({color} : BallProps) {
  
  return (
    <div style={{backgroundColor: color}} className={cn("size-4 rounded-full", )} />
  )
}
