import { useKanban } from "../../app/hooks/useKanban";
import { BoardColumn } from "./board-column";
import { BoardHeader } from "./board-header";

export default function Board() {
  const {selectedBoard} = useKanban()
  const todoColumn = selectedBoard?.tasks.filter((item) => item.status === 'todo')
  const doingColumn = selectedBoard?.tasks.filter((item) => item.status === 'doing')
  const doneColumn = selectedBoard?.tasks.filter((item) => item.status === 'done')
  

 
    return (
      <section className=" w-full h-[740px]">
          <BoardHeader todoLength={todoColumn?.length} doingLength={doingColumn?.length} doneLength={doneColumn?.length} />
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-3   md:h-[95%] ">
          <ul className="flex flex-col   gap-2 mt-4 md:gap-4">  
            {todoColumn && todoColumn?.length > 0 &&  <h2 className="md:hidden">Todo</h2>}
          {todoColumn && todoColumn?.length > 0 &&  <BoardColumn arr={todoColumn} />}
          </ul>
          <ul className="flex flex-col mt-2 md:mt-4  gap-4">
          {doingColumn && doingColumn?.length > 0 &&  <h2 className="md:hidden">doing</h2>}
          
          {doingColumn && doingColumn?.length > 0 && <BoardColumn arr={doingColumn} />}
          </ul>
          <ul className="flex flex-col mt-2 md:mt-4  gap-4">
          {doneColumn && doneColumn?.length > 0 &&  <h2 className="md:hidden">done</h2>}
     
          { doneColumn && doneColumn?.length > 0 && <BoardColumn arr={doneColumn} />}
          </ul>
           
            
          </div>
         </section>
    )
  

  
}
