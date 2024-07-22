import { BoardingHeader } from "./boarding-header";

interface BoardHeaderProps {
  todoLength:number | undefined
  doingLength: number | undefined
  doneLength:number | undefined
   
}

export function BoardHeader({todoLength, doingLength, doneLength}: BoardHeaderProps) {
  return (
    <header className=" hidden md:grid grid-cols-1 md:grid-cols-3 gap-3 ">
    <BoardingHeader color="#67e8f9" text={`todo ${(todoLength ?? 0)}`} />
    <BoardingHeader color="#6366f1" text={`doing ${(doingLength ?? 0)}`} />
    <BoardingHeader color="#22c55e" text={`done ${(doneLength ?? 0)} `} />
   
  </header>
  )
}
