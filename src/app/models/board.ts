
export interface IBoard {
  id: string;
  label:string;
  tasks: ITask[]
}

export interface ITask {
  title: string;
  description: string;
  subtask: ISub[];
  status: "todo" | "doing" | "done";
  id: string | undefined;
}

export interface ISub {
  id: string;
  completed: boolean;
  text: string
}