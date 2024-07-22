export interface IKanban {
  id:string;
  title: string;
  description: string;
  subtask: string[]
  status: 'todo' | 'doing' | 'done'
}