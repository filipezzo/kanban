import { Trash } from "lucide-react";
import { useState } from "react";
import { useKanban } from "../../app/hooks/useKanban";
import { ITask } from "../../app/models/board";
import { ModalInfo } from "./modal-info";

export  function BoardColumn({ arr }: { arr: ITask[] }) {
  const [openModalInfo, setOpenModalInfo] = useState(false)
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null)
  const {onDeleteTask} = useKanban()

  const handleItemClick = (task:ITask) => {
     setOpenModalInfo(true)
    setSelectedTask(task)
  }

  const handleCloseModal = () => setOpenModalInfo(false)
 
  return (
    <>
      {arr.length > 0 ? (
        arr.map((item) => (
          <li onClick={() => handleItemClick(item)} key={item.id} className="shadow-md cursor-pointer transition-all hover:scale-95 hover:opacity-80 p-4 bg-neutral-900 rounded-xl">
            <div className="flex items-center justify-between">
            <h2 className="text-white text-lg">{item.title}</h2>
            <button onClick={() => onDeleteTask(item.id)} className="hover:text-red-500 transition-all" ><Trash className="size-5" /></button>
            </div>
            
          {
            item.subtask.length === 0  && <small className="text-white/80">0  subtasks</small>
          }
            {item.subtask.length > 0 && <small className="text-white/80">{item.subtask.filter(item => item.completed).length} of {item.subtask.length} subtasks</small>}
          </li>
        ))
      ) : (
        <li className="border p-4 bg-neutral-900 rounded-xl">No tasks</li>
      )}
      {openModalInfo && <ModalInfo onModalClose={handleCloseModal} task={selectedTask} /> }
    </>
  );
}