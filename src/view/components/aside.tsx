import { Notebook, SquareKanban } from "lucide-react";
import { useState } from "react";
import { useKanban } from "../../app/hooks/useKanban";
import { Button } from "./button";
import Heading from "./heading";

export  function Aside() {
  const [isNewItemOpen, setIsNewItemOpen] = useState(false)
  const [newItem, setNewItem] = useState("")
  const {onAddBoard, board, onSelectingBoard} = useKanban()

  const handleOpenNewItem = () => setIsNewItemOpen(true)


  const handleSaveItem = () => {
    if(!newItem) return

    setIsNewItemOpen(false)
    onAddBoard({
      id: crypto.randomUUID(),
      label: newItem,
      tasks: []
    })
    setNewItem("")

  }
  return (
    <aside className=" border-r bg-neutral-900 border-white/5">
        <header className="flex items-center p-8 gap-4">
          <Notebook className="text-indigo-900 " />
          <h1 className="font-mono font-semibold text-white/80 text-2xl">kanban</h1>
        </header>
        {
          board.length > 0 ? (<div className="space-y-4 mt-8">
        
            <Heading>All boards ({board.length})</Heading>
            <ul className="flex flex-col gap-4">
           {board.map((item) => (
             <li onClick={() => onSelectingBoard(item)} key={item.id} className=" max-w-[90%] flex items-center h-12 shadow-sm py-1 pl-8 pr-4 gap-2  font-semibold text-white bg-indigo-600 rounded-br-2xl rounded-tr-2xl hover:opacity-80 transition-all cursor-pointer">
             <SquareKanban className="size-5" />
             <span>{item.label}</span>
             </li>
           ))}
            </ul>
            {
              isNewItemOpen && (
                <div className="flex items-center gap-2 p-4 ">
                  <input value={newItem} onChange={(e) => setNewItem(e.target.value)} className="bg-transparent outline-none px-4 py-1 rounded-md border-white/20 border  block w-full" />
                  <button onClick={handleSaveItem}>save</button>
                </div>
              )
            }
            <button className="pl-4 hover:text-indigo-500 transition-colors" onClick={handleOpenNewItem}>Create New board</button>
            </div>) : (<div>
              <Button className="my-4 w-full" onClick={handleOpenNewItem}>Add a new kanban</Button>
              {isNewItemOpen && (
                <div className="flex w-full p-4 items-center gap-2 ">
                  <input value={newItem} onChange={(e) => setNewItem(e.target.value)} className="bg-transparent outline-none px-4 py-1 rounded-md border-white/20 border" />
                  <button onClick={handleSaveItem}>save</button>
                </div>
              )}
            </div>)
        }
      </aside>
  )
}
