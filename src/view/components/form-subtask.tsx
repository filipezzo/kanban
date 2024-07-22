import { useState } from "react";
import { cn } from "../../app/utils/cn";
import { Button } from "./button";
import { ISubtasks } from "./modal";

interface FormProps{
  subtasks: ISubtasks[];
  onAddSubtask(object: ISubtasks): void;
}


export  function FormSubtask({subtasks, onAddSubtask}:FormProps) {
  const [value, setValue] = useState("")

  const handleClick = () => {
    if(!value) return
    const newObj:ISubtasks =  {
      id: crypto.randomUUID(),
      completed: false,
      text:value
    }
    onAddSubtask(newObj)
    setValue("")
  }

  return (
    <fieldset className="space-y-4 flex flex-col">
          <label>Subtasks</label>
          {
            subtasks.length > 0 && subtasks.map((task) => (
              <p className="border-b text-indigo-500 border-b-white/10" key={task.id}>{task.text}</p>
            ))
          }
          
           <input value={value} onChange={(e) =>setValue(e.target.value)} className={cn("h-12 rounded-md border px-4 placeholder:text-gray-500 outline-none border-white/10 bg-transparent")} placeholder="new task..."  />
          

          <Button disabled={!value} type="button" onClick={handleClick}  variant>+ Add New Subtask</Button>
        </fieldset>
  )
}

