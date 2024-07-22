import { X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useKanban } from "../../app/hooks/useKanban";
import { ITask } from "../../app/models/board";
import { IKanban } from "../../app/models/kanban";
import { cn } from "../../app/utils/cn";
import { BaseModal } from "./base-modal";
import { Button } from "./button";
import { FormInput } from "./form-input";
import { FormSubtask } from "./form-subtask";
import FormTextarea from "./form-textarea";


interface ModalCloseProps {
  onModalClose(): void;
}
export interface ISubtasks {
  id: string;
  completed: false; 
  text: string
}



export  function Modal({onModalClose}: ModalCloseProps) {
  const [formData, setFormData] = useState({title: "", description: ""} as IKanban)
  const [description, setDescription] = useState("")
  const [subtasks, setSubTasks] = useState<ISubtasks[]>([])
  
  const [select, setSelect] = useState('todo')
  const {onAddTask}  = useKanban()
  const ref = useRef<HTMLFormElement | null>(null)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleAddSubtask = (object : ISubtasks) => {
    setSubTasks([...subtasks, object])
  }


  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();

    if(!formData.title || !description){
      return
    }

    const newTask:ITask = {
    
      ...formData,
      id: crypto.randomUUID(),
      description,
      status: select as 'todo' | 'doing' | 'done' ,
      subtask:  subtasks
    }
    
    onAddTask(newTask)
    onModalClose()
  }


  useEffect(() => {
    const handleClickOutside = (e:MouseEvent) => {
      const target = e.target as Node
     if(ref.current && !ref.current.contains(target)) {
      onModalClose()
     }
    }

    const handleEscPress = (e:KeyboardEvent) => {
      if(e.key === 'Escape') {
        onModalClose()
      }
    }

     window.addEventListener('mousedown', handleClickOutside)
     window.addEventListener('keydown', handleEscPress)

     return () => {
      window.removeEventListener('mousedown',handleClickOutside)
      window.removeEventListener('keydown', handleEscPress)
     }
  }, [ref, onModalClose])


  return (
    <BaseModal>
      <form ref={ref} onSubmit={handleSubmit} className="rounded-lg max-w-2xl space-y-4 bg-neutral-900 p-8  w-full">
        <header className="flex items-center justify-between">
        <legend className="text-white font-semibold text-xl">Add New Task</legend>
       <button type="button" onClick={onModalClose}> <X /></button>
        </header>
        <FormInput value={formData.title} name="title" onChange={handleChange} text="Title" placeholder="e.g Tale coffee break"  />
        <FormTextarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" text="Description"  />
        <FormSubtask subtasks={subtasks} onAddSubtask={handleAddSubtask}   />
        <fieldset className="flex flex-col gap-2">
          <label>Status</label>
          <select onChange={(e) => setSelect(e.target.value)} className={cn("h-12 rounded-md border px-4 appearance-none placeholder:text-gray-500 outline-none border-white/10 bg-transparent   relative after:size-5 after:block right-0 after:content-['↓'] after:text-red-500 after:absolute after:right-4 after:top-1/2 after:transform after:-translate-y-1/2 after:pointer-events-none")}>
          <option value="todo">todo</option>
          <option value="doing">doing</option>
          <option value="done">done</option>
          </select>
        </fieldset>
        <Button disabled={!formData.title || !description} className="w-full">Create Task</Button>
      </form>
    </BaseModal>
  )
}
